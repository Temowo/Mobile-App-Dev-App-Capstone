import * as swagger from '@nestjs/swagger';
import * as validators from 'class-validator';

export class FindOneParams {
    @validators.IsNumberString()
    id: number;
}

export class RegisterDto  {
    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'name of persona',
        type: String
    })
    name:string;

    @validators.IsEmail()
    @swagger.ApiProperty({
        description:'valid email address',
        type: String
    })
    email:string;

    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'strong password min. of 8 characters',
        type: String
    })
    password:string;

    @validators.IsPhoneNumber()
    @swagger.ApiProperty({
        description:'valid phone number. should include country code +234 ',
        type: String
    })
    phone:string;


}
export type RegisterType = RegisterDto

export class RegisterVendorDto  {
    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'name of persona',
        type: String
    })
    name:string;

    @validators.IsEmail()
    @swagger.ApiProperty({
        description:'valid email address',
        type: String
    })
    email:string;

    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'strong password min. of 8 characters',
        type: String
    })
    password:string;

    @validators.IsPhoneNumber()
    @swagger.ApiProperty({
        description:'valid phone number. should include country code +234 ',
        type: String
    })
    phone:string;

//  @validators.IsPhoneNumber()
    @swagger.ApiProperty({
        description:'percentage fee per order eg. 20, 45, 15',
        type: Number
    })
    orderFeePercentage:number;

}
export type RegisterVendorType = RegisterVendorDto

export class RegisterAdminDto  {
    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'name of persona',
        type: String
    })
    name:string;

    @validators.IsEmail()
    @swagger.ApiProperty({
        description:'valid email address',
        type: String
    })
    email:string;

    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'strong password min. of 8 characters',
        type: String
    })
    password:string;

    @validators.IsPhoneNumber()
    @swagger.ApiProperty({
        description:'valid phone number. should include country code +234 ',
        type: String
    })
    phone:string;

}

export type RegisterAdminType = RegisterAdminDto;


export class ForgetPasswordDto {
    @validators.IsEmail()
    @swagger.ApiProperty({
        description:'valid email address',
        type: String
    })
    email:string;
}


export enum Roles {
    ADMIN = "ADMIN",
    VENDOR = "VENDOR",
    USER = "USER",
    RIDER = "RIDER"
}


export class LoginDto {
    @validators.IsEmail()
    @swagger.ApiProperty({
        description:'valid email address',
        type: String
    })
    email:string;
    
    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'plain text password of the account to authenticate',
        type: String
    })
    password:string;
}
export type LoginDtoType = {
    
    email:string;
    
    password:string;
}

export class PasswordResetDto {
        
    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'secure jwt token to validate password reset request',
        type: String
    })
    token:string;

    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'new password to reset',
        type: String
    })
    password:string;

}
export type PasswordResetType = PasswordResetDto

export type WelcomeEvent = {
    address:string;
    verificationCode:string;
    name:string
}


export class ResponseDto {
    @swagger.ApiProperty({
        description:'reponse success status either true | false',
        type: Boolean
    })
    success: boolean;
    @swagger.ApiProperty({
        description:'response remark',
        type: String
    })
    message: string;
    @swagger.ApiPropertyOptional({
        description:'optional response payload ',
    })
    data?: any;
}


export class Contact {
    @swagger.ApiProperty({
        description:'street address information',
        type: String
    })
    address: string;

    @swagger.ApiProperty({
        description:'latitude of the contact location',
        type: Number
    })
    lat: number;

    @swagger.ApiProperty({
        description:'longitude of the contact location',
        type: Number
    })
    lng: number

    @swagger.ApiProperty({
        description:'phone number to the contact person',
        type: String
    })
    phone?: string;
}
export type ContactType = {
    
    address: string;

    lat: number;

    lng: number

    phone?: string;

}

export class createAddressDto {
        
    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'street name and number',
        type: String
    })
    street:string;

    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'address city',
        type: String
    })
    city:string;

    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'address state',
        type: String
    })
    state:string;

    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'latitude of the address',
        type: Number
    })
    lat:number;

    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'longitude of the address',
        type: Number
    })
    lng:number;

}
export type createAddressDtoType = {
     
    street:string;

    city:string;

    state:string;

    lat:number;

    lng:number;
}

export class CreateMenuDto {

    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'name of the menu',
        type: String
    })
    name:string;
    
    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'price of the menu',
        type: Number
    })
    price:number;

    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'description of the menu',
        type: String
    })
    description:string;

    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'meal type of the menu',
        type: String
    })
    mealType:string;

    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'category of the menu',
        type: String
    })
    category:string;

}
export type CreateMenuDtoType = {
    
    name:string;
    
    price:number;

    description:string;

    mealType: string;
    
    category: string;
    file:any;

}

// export class MenuFileUpload {
//     fileName:string;
//     fileBuffer: Buffer;
// }

export class UpdateMenuPriceDto {
    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'price of the menu',
        type: Number
    })
    price:number;
}
export type UpdateMenuPriceDtoType = { price:number }

export class CreateOrderDto {
    
    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'menu id to create order for',
        type: String
    })
    menuId:string;
    
    
    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'amount for order',
        type: Number
    })
    amount : number;

    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'quantity of the order',
        type: Number
    })
    quantity: number;

    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'payment type to create order for',
        type: String
    })
    payment_type:string;

    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'payment status of the order',
        type: Boolean
    })
    isPaid: boolean;

    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'delivery contact information for user',
        type: Contact
    })
    deliveryInfo: ContactType;


}

export type CreateOrderDtoType = {
    
    menuId:string;

    payment_type: string;
    
    isPaid:boolean;
    
    amount : number;
    
    quantity: number;

    deliveryInfo: ContactType;
}

export class PaymentVerificationDto {
    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'payment reference',
        type: String
    })
    reference:string;
}


export type PaymentVerificationDtoType = {
    
    reference:string;
}



export class WithdrawDto {
    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'payment reference',
        type: String
    })
    accountNumber:string;

    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'payment reference',
        type: String
    })
    accountHolder:string;
    
    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'payment reference',
        type: String
    })
    bankName:string;
}


export type WithdrawDtoType = {
    
    accountNumber:string;
    accountHolder:string;
    bankName:string;

}
export class ConfirmWithdrawDto {
    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'secure OTP sent to vendor phone',
        type: String
    })
    otp:string;
}



export type ConfirmWithdrawDtoType = {   
    otp:string;
}
export enum OrderStatus {
    CREATED = "NEW",
    ACCEPTED = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}

export enum DispatchStatus {
    CREATED = "NEW",
    STARTED = "IN_PROGRESS",
    DELIVERED = "DELIVERED"
}

export class ChangePasswordDto {
    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'old password',
        type: String
    })
    oldPassword:string;
    @validators.IsNotEmpty()
    //@validators.IS_STRONG_PASSWORD()
    @swagger.ApiProperty({
        description:'new password',
        type: String
    })
    newPassword:string;
}

export type dispatchEventPayload = {
    vendor:string,
    dropOff: ContactType,
    order: string,
}


export type CheckoutResponse = {
    status: boolean;
    message: string;
    data: {
      authorization_url: string,
      access_code: string;
      reference: string;
    }
}
export class CreateCheckoutDto {
    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'order id',
        type: String
    })
    orderId:string;
    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'order amount',
        type: Number
    })
    amount:number;
    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'email of the user',
        type: [String]
    })
    channels:string[]
}

export type CreateCheckout = CreateCheckoutDto

export type verifyTransactionResponse = 
{
    status: boolean;
    message: string;
    data: {
      id: number;
      domain: string;
      status: string;
      reference: string;
      amount: number;
      message: any;
      gateway_response: string;
      paid_at: string;
      created_at: string;
      channel: string;
      currency: string;
      ip_address: string;
      metadata: string;
      log:any;
      fees: number;
      fees_split: any;
      authorization: any;
      customer: any;
      plan: any;
      split: {};
      order_id: any;
      paidAt: string;
      createdAt: string;
      requested_amount: number;
      pos_transaction_data: any;
      source: any;
      fees_breakdown: any;
      transaction_date: string;
      plan_object: {};
      subaccount: {};
    }
}

export class CreateSubAccountDto {
    business_name: string; 
    bank:string;
    account_number: string;
}
export type CreateSubAccountType = CreateSubAccountDto
export type SubAccountType = {
    business_name:string;
    bank_code: string;
    account_number:string;
    percentage_charge: number;
    vendor: string,
}

export type CreateSubAccountResponse =
{
    status: boolean;
    message: string;
    data: {
        integration: number;
        domain: string;
        subaccount_code: string;
        business_name: string;
        description: any;
        primary_contact_name: any;
        primary_contact_email: any;
        primary_contact_phone: any;
        metadata: any;
        percentage_charge: number;
        is_verified: boolean;
        settlement_bank: string;
        account_number: string;
        settlement_schedule: string;
        active: boolean;
        migrate: boolean;
        id: number;
        createdAt: string;
        updatedAt: string;
    }
}

export type webhookEvent = 
{
    event: string;  
    data: {  
      id: number;  
      domain: string;  
      status: string;  
      reference: string;  
      amount: string;  
      message: null;  
      gateway_response: string;  
      paid_at: string;  
      created_at: string;  
      channel: string;  
      currency: string;  
      ip_address: string;  
      metadata: number;  
      log: any;
      fees: null;  
      customer: any;  
      authorization: any; 
      plan: any;  
    }
}

export class VerifyEmailDto {
    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'token to verify email address',
        type: String
    })
    token:string;

    @validators.IsNotEmpty()
    @swagger.ApiProperty({
        description:'user registered email address',
        type: String
    })
    email:string;
}
export type VerifyEmailType = VerifyEmailDto
