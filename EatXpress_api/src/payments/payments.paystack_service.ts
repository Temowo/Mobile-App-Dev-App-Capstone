import axios from "axios";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as dtos from 'src/core/dtos/fs.dtos';
import { IDataServices } from "src/core/abstracts/data_services.abstract";
import { StringGenerator } from "src/utils/utils.string_generator";
import { OnEvent, EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class PayStackService {
    baseUrl:string;
    paystackSecret:string;
    paystackKey:string;
    constructor(
        private readonly configService: ConfigService,
        private dataService:IDataServices,
        private stringGenerator: StringGenerator,
        private eventEmitter: EventEmitter2,
    ){
        this.baseUrl = this.configService.get('payStackUrl');
        this.paystackSecret = this.configService.get('paystackSecret');
        this.paystackKey = this.configService.get('paystackKey');
    }  

    @OnEvent('create_subaccount', { async: true })
    async createSubaccount(data:dtos.SubAccountType){
        let response = await this.sendRequest(
            "POST",
            "/subaccount",
            {
                business_name: data.business_name, 
                bank_code: data.bank_code, 
                account_number: data.account_number, 
                percentage_charge: data.percentage_charge
            }
        )as dtos.CreateSubAccountResponse;
        
        if(!response.status){
            console.log(response.message);
        }
        this.eventEmitter.emit('update_subaccount', {subaacountCode:response.data.subaccount_code, vendorId:data.vendor});
    }


    async createCheckout(data:dtos.CreateCheckout){
        
        let order = await this.dataService.orders.getById(data.orderId);
        let vendor = await this.dataService.users.getById(order.vendor.toString());
        
        // let response = await this.sendRequest(
        //     "POST",
        //     "/transaction/initialize",
        //     {
        //         amount:data.amount,
        //         channels: data.channels,
        //         reference: `${this.stringGenerator.generateRandomString(8)}-${Date.now()}`
        //     }
        // )as dtos.CheckoutResponse;
        
        let response = await this.sendRequest(
            "POST",
            "/transaction/initialize",
            {   email: vendor.email,
                amount:data.amount,
                subaccount: vendor.subAccountCode,
                channels: data.channels,
                reference: `${this.stringGenerator.generateRandomString(6)}-${Date.now()}`
            }
        )as dtos.CheckoutResponse;

        if(!response.status){
            throw new BadRequestException(response.message);
        }

        this.eventEmitter.emit('set_order_ref_auth', {
            orderId: data.orderId,
            reference:response.data.reference,
            checkout_url: response.data.authorization_url
        });

        return {
            success:true,
            message: response.message,
            data: {
                checkout_url: response.data.authorization_url
            }
        }
    }

    async verifyTransaction(reference:string){
        let response = await this.sendRequest(
            'GET',
            `/transaction/verify/${reference}`
        ) as dtos.verifyTransactionResponse;

        if(response.status){
            return {
                success: true,
                message: response.message,
            }
        }else{
            return {
                success:false,
                message: 'payment has not been confirmed'
            }
        }

    }
        
    
    async getTransactions(){
        let transactions:any;
        let response = await this.sendRequest(
            'GET',
            '/transaction'
        )
    }        


    //initWithdrawal

    //confirmWithdrawal

    private sendRequest(method:string, endpoint:string, data?:any):Promise<any>{
        return new Promise<any>((resolve, reject) =>{

            if(method === 'POST'){
                axios.post(
                    `${this.baseUrl}/${endpoint}`,
                    JSON.stringify(data),
                    {
                        headers:{
                            Authorization:`Bearer ${this.paystackSecret}`,
                            'Content-Type': "application/json"
                        }
                    } 
                )
                .then(response => resolve(response.data))
                .catch(error => reject(error.message));
            }else{
                axios.get(
                    `${this.baseUrl}/${endpoint}`,
                    {
                        headers:{
                            Authorization:`Bearer ${this.paystackSecret}`,
                        }
                    } 
                )
                .then(response => resolve(response.data))
                .catch( error => reject(error.message));
            }
        })
    }
}

