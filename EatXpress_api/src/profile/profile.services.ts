import { IDataServices } from "src/core/abstracts/data_services.abstract";
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as dtos from "src/core/dtos/fs.dtos";
import  ObjectId  from "mongoose";
import * as bcrypt from 'bcrypt';
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { bankCodes } from "src/utils/banks";

@Injectable()
export class ProfileService {
    constructor(
        private dataService: IDataServices,
        private evenEmitter:EventEmitter2,
    ){}
    
    async saveAddress(address: dtos.createAddressDto, id:string, prioritize:boolean){
        let user = await this.dataService.users.getById(id);
        if(!user) throw new NotFoundException('Account not found');
        if(prioritize){
            //make existing default address false
            let defaultAddress = await this.dataService.address.getOne('user_default_address', id);
            
            if(defaultAddress._id){
                defaultAddress.default = false;
                await this.dataService.address.update(defaultAddress._id.toString(), defaultAddress);
            }

            await this.dataService.address.create(
                {
                    ...address, 
                    user: user._id,
                    default:true
                }
            );
        }else{
            await this.dataService.address.create(
                {
                    ...address, 
                    user: user._id,
                    default:false
                }
            );
        }
        let newUseraddressList = await this.dataService.address.getByField('user_address', user._id);

        return {
            success:true,
            message:'address created',
            data: {
                user,
                newUseraddressList
            }
        }

    }

    //get user profile
    async getProfile(Id:string){
        let user = await this.dataService.users.getById(Id);
        if(!user) throw new NotFoundException('User not found');
        let address = await this.dataService.address.getByField('user_address', user._id);
        return {
            success: true,
            message: 'profile retreived',
            data: {
                user,
                address
            }
        }
        

    }    

    //get all adresses
    async getAll(){
        let addressList = await this.dataService.address.getAll();
        return {
            success:true,
            message:'users address list',
            data: addressList
        }
    } 

    //change password
    async changePassword(Id:string, oldPassword:string, newPassword:string,){
        try {
            
            let user = await this.dataService.users.getById(Id);
            if(!user)throw new NotFoundException('account does not exist');
    
            //compare old password with new password
            if(oldPassword === newPassword){
                throw new BadRequestException('the password has been used by you');
            }
            
            //compare old password with hash
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if(!isMatch) {
                throw new BadRequestException('password does not match');
            }
            //hash new password and update
            const hashedPassword = await bcrypt.hash(newPassword, await bcrypt.genSalt());
            user.password = hashedPassword;
            await this.dataService.users.update(user._id.toString(), user);
    
            return {
                success: true,
                message: 'password changed successfully'
            }
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async saveVendorBankDetails(bankDetailsDto:dtos.CreateSubAccountType, vendorId:string){
        //get the vendor id
        let vendor = await this.dataService.users.getById(vendorId);
        if(!vendor._id){
            throw new NotFoundException('Account not found');
        }
        
        //map the appropriate bank code based on bank name

        let payload : dtos.SubAccountType= {
            business_name: bankDetailsDto.business_name,
            bank_code:bankCodes.filter(bank => bank.name === bankDetailsDto.bank )[0].code,
            account_number:bankDetailsDto.account_number,
            percentage_charge: vendor.orderFeePercentage / 100,
            vendor:vendorId
        }
        //trigger the create subaccount event
        this.evenEmitter.emit('create_subaccount', payload);

        return {
            success: true,
            message: "your bank info is been saved for easy funds collection"
        }
    }


    @OnEvent('update_subaccount', { async:true })
    async updateSubaccountCode(data:{subaccountCode:string, vendorId:string}){
        
        let vendor = await this.dataService.users.getById(data.vendorId);
        vendor.subAccountCode = data.subaccountCode;

        await this.dataService.users.update(vendor._id.toString(), vendor);
    }
}
