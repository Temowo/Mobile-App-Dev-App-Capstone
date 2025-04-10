import { IDataServices } from "src/core/abstracts/data_services.abstract";
import { ForbiddenException, BadRequestException, Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { TokenManager } from "src/utils/utils.jwt.token_manager";
import { TokenExtractor } from "src/utils/utils.token_extractor";
import * as bcrypt from 'bcrypt';
import * as dtos from "src/core/dtos/fs.dtos";
import { Request } from "express";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { StringGenerator } from "src/utils/utils.string_generator";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
    constructor(
        private dataService: IDataServices,
        private tokenManager: TokenManager,
        private extractor: TokenExtractor,
        private eventEmitter: EventEmitter2,
        private stringGenerator: StringGenerator, 
        @Inject(CACHE_MANAGER)private cacheManager: Cache,
    ){}

    //add new admin (admin only)
    async addAdmin(admin:dtos.RegisterAdminType):Promise<dtos.ResponseDto>{
        //hash the plain text password
        const hashedPassword = await bcrypt.hash(admin.password, await bcrypt.genSalt());
        admin.password = hashedPassword;
        admin.phone = `234${admin.phone.replace(admin.phone.charAt(0), '')}`;
    
        try {
            let newAdmin = await this.dataService.users.create({...admin, status:"INACTIVE", role:dtos.Roles.ADMIN, joinDate: new Date()});
            let verificationCode = this.stringGenerator.generateRandomString(6);
            await this.cacheManager.set(`verify_${verificationCode}`, newAdmin.email)

            this.eventEmitter.emit('userCreated', {name:admin.name, verificationCode, address:admin.email});
            return {
                success: true,
                message:'admin added successfully'
            }
        } catch (error) {
            return {
                success: false,
                message: error.keyPattern['email'] 
                    ? 'account with that email already exist' 
                    : error.keyPattern['phone']
                    ? 'account with that email already exist' 
                    :'provide valid data'
            }
        }


    }

    //register vendor (admin only)
    async registerVendor(persona:dtos.RegisterVendorType):Promise<dtos.ResponseDto>{
        let dbVendor = await this.dataService.users.getOne('email', persona.email);
        if(dbVendor){
            throw new BadRequestException('Account already exits');
        }
        //hash the plain text password
        const hashedPassword = await bcrypt.hash(persona.password, await bcrypt.genSalt());

        persona.password = hashedPassword;
        persona.phone = `234${persona.phone.replace(persona.phone.charAt(0), '')}`;

        let newVendor = await this.dataService.users.create({...persona, status:"INACTIVE", orderFeePercentage:persona.orderFeePercentage, role:dtos.Roles.VENDOR, joinDate: new Date()});

        //create a welcome email queue 
        let verificationCode = this.stringGenerator.generateRandomString(6);
        await this.cacheManager.set(`verify_${verificationCode}`, newVendor.email)
        
        this.eventEmitter.emit('userCreated', { address: newVendor.email, verificationCode, name:newVendor.name });

        this.eventEmitter.emit('create_customer', 
            {
                name: newVendor.name,
                email: newVendor.email,
                phone: newVendor.phone
            }
        )

        return {
            success: true,
            message:'vendor registered successfully',
        }
    }


    //register user | rider
    async registerPersona(persona:dtos.RegisterDto):Promise<dtos.ResponseDto>{
        
        let dbUser = await this.dataService.users.getOne('auth_email', persona.email);
        if(dbUser){
            throw new BadRequestException('Account already exits');
        }
        //hash the plain text password
        const hashedPassword = await bcrypt.hash(persona.password, await bcrypt.genSalt());

        persona.password = hashedPassword;
        persona.phone = `234${persona.phone.replace(persona.phone.charAt(0), '')}`;
        
        let role = 'user' ? dtos.Roles.USER : dtos.Roles.RIDER

        let newUser = await this.dataService.users.create({...persona, status:"INACTIVE", role, joinDate: new Date()})            

        //create a welcome email queue 
        let verificationCode = this.stringGenerator.generateRandomString(6);
        await this.cacheManager.set(`verify_${verificationCode}`, newUser.email)

        this.eventEmitter.emit('userCreated', { address: newUser.email, verificationCode, name: newUser.name});
        return {
            success: true,
            message:'user registered successfully',
        }
    }

    async resendVerifyToken(email:string){
        let user = await this.dataService.users.getOne('auth_email', email);
        if(!user._id){
            throw new UnauthorizedException('Account does not exist')
        }
        let verificationCode = this.stringGenerator.generateRandomString(6);
        await this.cacheManager.set(`verify_${verificationCode}`, user.email)

        this.eventEmitter.emit('resendVerifyToken', { address: user.email, verificationCode});
        
        return {
            success: true,
            message: "email verification token sent."
        }
    }


    async verifyEmail(data:dtos.VerifyEmailType){
        let email2Verify = await this.cacheManager.get<string>(`verify_${data.token}`);
        if(email2Verify !== data.email){
            throw new UnauthorizedException('incorrect email address/token expired ');
        }

        let user = await this.dataService.users.getOne('auth_email', email2Verify);
        user.status = "ACTIVE";
        await this.dataService.users.update(user._id.toString(), user);

        await this.cacheManager.del(`verify_${data.token}`)

        return {
            success: true,
            message: "email verified."
        }
    }


    //login handlers
    async signIn(creds:dtos.LoginDto):Promise<dtos.ResponseDto>{

        let user = await this.dataService.users.getOne('auth_email', creds.email);
        
        if(!user) {
            // console.log(
            //     JSON.stringify(this.reqExtractorService.extractData('failed login'))
            // );
            throw new UnauthorizedException('incorrect email/password entered');
        }

        if(user.status === "INACTIVE"){
            throw new UnauthorizedException('your email address is not verified');
        }
        
        const isMatch = await bcrypt.compare(creds.password, user.password);
        if(!isMatch){
            throw new UnauthorizedException('incorrect email/password entered');
        }
        const tokenPayload = {sub: user._id, role: user.role };
        const token = await this.tokenManager.signToken(tokenPayload);

        const user_profile = await this.dataService.address.getByField('user_address', user._id);

        return { success: true, message:'access tokens generated', data: { user, address:user_profile, ...token } };
    }    

    
    async refreshAccessToken(request:Request){
        const token = this.extractor.extractTokenFromHeader(request);
        if(!token){
            throw new ForbiddenException('invalid/missing token');
        }
        const paylod = await this.tokenManager.verifyToken(token);
        return this.tokenManager.signRefreshedToken(paylod);
    }

    //forget password handlers
    async forgetPassword(recoveryDto:{email:string}):Promise<dtos.ResponseDto>{
        let user = await this.dataService.users.getOne('auth_email', recoveryDto.email);
        
        if(!user) {
            throw new UnauthorizedException('That account does not exit');
        }

        //account is valid && send password reset mail
        // const token = await this.tokenManager.signPasswordToken({sub:recoveryDto.email});
        let token = this.stringGenerator.generateRandomString(6);
        await this.cacheManager.set(`reset_${token}`, user.email)

        this.eventEmitter.emit('recoverPass', { address: recoveryDto.email, token });
        

        return {
            success:true, 
            message:'password reset link sent',
        }

    }

    //resetPassword
    async resetPassword(password:string, token:string):Promise<dtos.ResponseDto>{
        if(!password && !token){
            throw new BadRequestException('invalid request data');
        }

        //const payload = await this.tokenManager.verifyToken(token);
        let email2Reset = await this.cacheManager.get<string>(`reset_${token}`);
        
        // if(!payload){ throw new BadRequestException('invalid request data'); }

        const user = await this.dataService.users.getOne('auth_email', email2Reset); //payload.sub
        if(!user) {
            throw new UnauthorizedException('That account does not exit');
        }

        //email is valid account && hash new password
        let hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync());
        user.password = hashedPassword;
        await this.dataService.users.update(user._id.toString(), user);  
        
        await this.cacheManager.del(`reset_${token}`)
        
        return {
            success:true,
            message:'password updated successfully',
        }
    }


    
}
