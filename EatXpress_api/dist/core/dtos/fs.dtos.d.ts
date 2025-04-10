export declare class FindOneParams {
    id: number;
}
export declare class RegisterDto {
    name: string;
    email: string;
    password: string;
    phone: string;
}
export type RegisterType = RegisterDto;
export declare class RegisterVendorDto {
    name: string;
    email: string;
    password: string;
    phone: string;
    orderFeePercentage: number;
}
export type RegisterVendorType = RegisterVendorDto;
export declare class RegisterAdminDto {
    name: string;
    email: string;
    password: string;
    phone: string;
}
export type RegisterAdminType = RegisterAdminDto;
export declare class ForgetPasswordDto {
    email: string;
}
export declare enum Roles {
    ADMIN = "ADMIN",
    VENDOR = "VENDOR",
    USER = "USER",
    RIDER = "RIDER"
}
export declare class LoginDto {
    email: string;
    password: string;
}
export type LoginDtoType = {
    email: string;
    password: string;
};
export declare class PasswordResetDto {
    token: string;
    password: string;
}
export type PasswordResetType = PasswordResetDto;
export type WelcomeEvent = {
    address: string;
    verificationCode: string;
    name: string;
};
export declare class ResponseDto {
    success: boolean;
    message: string;
    data?: any;
}
export declare class Contact {
    address: string;
    lat: number;
    lng: number;
    phone?: string;
}
export type ContactType = {
    address: string;
    lat: number;
    lng: number;
    phone?: string;
};
export declare class createAddressDto {
    street: string;
    city: string;
    state: string;
    lat: number;
    lng: number;
}
export type createAddressDtoType = {
    street: string;
    city: string;
    state: string;
    lat: number;
    lng: number;
};
export declare class CreateMenuDto {
    name: string;
    price: number;
    description: string;
    mealType: string;
    category: string;
}
export type CreateMenuDtoType = {
    name: string;
    price: number;
    description: string;
    mealType: string;
    category: string;
    file: any;
};
export declare class UpdateMenuPriceDto {
    price: number;
}
export type UpdateMenuPriceDtoType = {
    price: number;
};
export declare class CreateOrderDto {
    menuId: string;
    amount: number;
    quantity: number;
    payment_type: string;
    isPaid: boolean;
    deliveryInfo: ContactType;
}
export type CreateOrderDtoType = {
    menuId: string;
    payment_type: string;
    isPaid: boolean;
    amount: number;
    quantity: number;
    deliveryInfo: ContactType;
};
export declare class PaymentVerificationDto {
    reference: string;
}
export type PaymentVerificationDtoType = {
    reference: string;
};
export declare class WithdrawDto {
    accountNumber: string;
    accountHolder: string;
    bankName: string;
}
export type WithdrawDtoType = {
    accountNumber: string;
    accountHolder: string;
    bankName: string;
};
export declare class ConfirmWithdrawDto {
    otp: string;
}
export type ConfirmWithdrawDtoType = {
    otp: string;
};
export declare enum OrderStatus {
    CREATED = "NEW",
    ACCEPTED = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export declare enum DispatchStatus {
    CREATED = "NEW",
    STARTED = "IN_PROGRESS",
    DELIVERED = "DELIVERED"
}
export declare class ChangePasswordDto {
    oldPassword: string;
    newPassword: string;
}
export type dispatchEventPayload = {
    vendor: string;
    dropOff: ContactType;
    order: string;
};
export type CheckoutResponse = {
    status: boolean;
    message: string;
    data: {
        authorization_url: string;
        access_code: string;
        reference: string;
    };
};
export declare class CreateCheckoutDto {
    orderId: string;
    amount: number;
    channels: string[];
}
export type CreateCheckout = CreateCheckoutDto;
export type verifyTransactionResponse = {
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
        log: any;
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
    };
};
export declare class CreateSubAccountDto {
    business_name: string;
    bank: string;
    account_number: string;
}
export type CreateSubAccountType = CreateSubAccountDto;
export type SubAccountType = {
    business_name: string;
    bank_code: string;
    account_number: string;
    percentage_charge: number;
    vendor: string;
};
export type CreateSubAccountResponse = {
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
    };
};
export type webhookEvent = {
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
    };
};
export declare class VerifyEmailDto {
    token: string;
    email: string;
}
export type VerifyEmailType = VerifyEmailDto;
