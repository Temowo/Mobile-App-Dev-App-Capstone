"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyEmailDto = exports.CreateSubAccountDto = exports.CreateCheckoutDto = exports.ChangePasswordDto = exports.DispatchStatus = exports.OrderStatus = exports.ConfirmWithdrawDto = exports.WithdrawDto = exports.PaymentVerificationDto = exports.CreateOrderDto = exports.UpdateMenuPriceDto = exports.CreateMenuDto = exports.createAddressDto = exports.Contact = exports.ResponseDto = exports.PasswordResetDto = exports.LoginDto = exports.Roles = exports.ForgetPasswordDto = exports.RegisterAdminDto = exports.RegisterVendorDto = exports.RegisterDto = exports.FindOneParams = void 0;
const swagger = require("@nestjs/swagger");
const validators = require("class-validator");
class FindOneParams {
}
__decorate([
    validators.IsNumberString(),
    __metadata("design:type", Number)
], FindOneParams.prototype, "id", void 0);
exports.FindOneParams = FindOneParams;
class RegisterDto {
}
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'name of persona',
        type: String
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
__decorate([
    validators.IsEmail(),
    swagger.ApiProperty({
        description: 'valid email address',
        type: String
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'strong password min. of 8 characters',
        type: String
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    validators.IsPhoneNumber(),
    swagger.ApiProperty({
        description: 'valid phone number. should include country code +234 ',
        type: String
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "phone", void 0);
exports.RegisterDto = RegisterDto;
class RegisterVendorDto {
}
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'name of persona',
        type: String
    }),
    __metadata("design:type", String)
], RegisterVendorDto.prototype, "name", void 0);
__decorate([
    validators.IsEmail(),
    swagger.ApiProperty({
        description: 'valid email address',
        type: String
    }),
    __metadata("design:type", String)
], RegisterVendorDto.prototype, "email", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'strong password min. of 8 characters',
        type: String
    }),
    __metadata("design:type", String)
], RegisterVendorDto.prototype, "password", void 0);
__decorate([
    validators.IsPhoneNumber(),
    swagger.ApiProperty({
        description: 'valid phone number. should include country code +234 ',
        type: String
    }),
    __metadata("design:type", String)
], RegisterVendorDto.prototype, "phone", void 0);
__decorate([
    swagger.ApiProperty({
        description: 'percentage fee per order eg. 20, 45, 15',
        type: Number
    }),
    __metadata("design:type", Number)
], RegisterVendorDto.prototype, "orderFeePercentage", void 0);
exports.RegisterVendorDto = RegisterVendorDto;
class RegisterAdminDto {
}
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'name of persona',
        type: String
    }),
    __metadata("design:type", String)
], RegisterAdminDto.prototype, "name", void 0);
__decorate([
    validators.IsEmail(),
    swagger.ApiProperty({
        description: 'valid email address',
        type: String
    }),
    __metadata("design:type", String)
], RegisterAdminDto.prototype, "email", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'strong password min. of 8 characters',
        type: String
    }),
    __metadata("design:type", String)
], RegisterAdminDto.prototype, "password", void 0);
__decorate([
    validators.IsPhoneNumber(),
    swagger.ApiProperty({
        description: 'valid phone number. should include country code +234 ',
        type: String
    }),
    __metadata("design:type", String)
], RegisterAdminDto.prototype, "phone", void 0);
exports.RegisterAdminDto = RegisterAdminDto;
class ForgetPasswordDto {
}
__decorate([
    validators.IsEmail(),
    swagger.ApiProperty({
        description: 'valid email address',
        type: String
    }),
    __metadata("design:type", String)
], ForgetPasswordDto.prototype, "email", void 0);
exports.ForgetPasswordDto = ForgetPasswordDto;
var Roles;
(function (Roles) {
    Roles["ADMIN"] = "ADMIN";
    Roles["VENDOR"] = "VENDOR";
    Roles["USER"] = "USER";
    Roles["RIDER"] = "RIDER";
})(Roles = exports.Roles || (exports.Roles = {}));
class LoginDto {
}
__decorate([
    validators.IsEmail(),
    swagger.ApiProperty({
        description: 'valid email address',
        type: String
    }),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'plain text password of the account to authenticate',
        type: String
    }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
exports.LoginDto = LoginDto;
class PasswordResetDto {
}
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'secure jwt token to validate password reset request',
        type: String
    }),
    __metadata("design:type", String)
], PasswordResetDto.prototype, "token", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'new password to reset',
        type: String
    }),
    __metadata("design:type", String)
], PasswordResetDto.prototype, "password", void 0);
exports.PasswordResetDto = PasswordResetDto;
class ResponseDto {
}
__decorate([
    swagger.ApiProperty({
        description: 'reponse success status either true | false',
        type: Boolean
    }),
    __metadata("design:type", Boolean)
], ResponseDto.prototype, "success", void 0);
__decorate([
    swagger.ApiProperty({
        description: 'response remark',
        type: String
    }),
    __metadata("design:type", String)
], ResponseDto.prototype, "message", void 0);
__decorate([
    swagger.ApiPropertyOptional({
        description: 'optional response payload ',
    }),
    __metadata("design:type", Object)
], ResponseDto.prototype, "data", void 0);
exports.ResponseDto = ResponseDto;
class Contact {
}
__decorate([
    swagger.ApiProperty({
        description: 'street address information',
        type: String
    }),
    __metadata("design:type", String)
], Contact.prototype, "address", void 0);
__decorate([
    swagger.ApiProperty({
        description: 'latitude of the contact location',
        type: Number
    }),
    __metadata("design:type", Number)
], Contact.prototype, "lat", void 0);
__decorate([
    swagger.ApiProperty({
        description: 'longitude of the contact location',
        type: Number
    }),
    __metadata("design:type", Number)
], Contact.prototype, "lng", void 0);
__decorate([
    swagger.ApiProperty({
        description: 'phone number to the contact person',
        type: String
    }),
    __metadata("design:type", String)
], Contact.prototype, "phone", void 0);
exports.Contact = Contact;
class createAddressDto {
}
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'street name and number',
        type: String
    }),
    __metadata("design:type", String)
], createAddressDto.prototype, "street", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'address city',
        type: String
    }),
    __metadata("design:type", String)
], createAddressDto.prototype, "city", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'address state',
        type: String
    }),
    __metadata("design:type", String)
], createAddressDto.prototype, "state", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'latitude of the address',
        type: Number
    }),
    __metadata("design:type", Number)
], createAddressDto.prototype, "lat", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'longitude of the address',
        type: Number
    }),
    __metadata("design:type", Number)
], createAddressDto.prototype, "lng", void 0);
exports.createAddressDto = createAddressDto;
class CreateMenuDto {
}
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'name of the menu',
        type: String
    }),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "name", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'price of the menu',
        type: Number
    }),
    __metadata("design:type", Number)
], CreateMenuDto.prototype, "price", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'description of the menu',
        type: String
    }),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "description", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'meal type of the menu',
        type: String
    }),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "mealType", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'category of the menu',
        type: String
    }),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "category", void 0);
exports.CreateMenuDto = CreateMenuDto;
class UpdateMenuPriceDto {
}
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'price of the menu',
        type: Number
    }),
    __metadata("design:type", Number)
], UpdateMenuPriceDto.prototype, "price", void 0);
exports.UpdateMenuPriceDto = UpdateMenuPriceDto;
class CreateOrderDto {
}
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'menu id to create order for',
        type: String
    }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "menuId", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'amount for order',
        type: Number
    }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "amount", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'quantity of the order',
        type: Number
    }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "quantity", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'payment type to create order for',
        type: String
    }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "payment_type", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'payment status of the order',
        type: Boolean
    }),
    __metadata("design:type", Boolean)
], CreateOrderDto.prototype, "isPaid", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'delivery contact information for user',
        type: Contact
    }),
    __metadata("design:type", Object)
], CreateOrderDto.prototype, "deliveryInfo", void 0);
exports.CreateOrderDto = CreateOrderDto;
class PaymentVerificationDto {
}
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'payment reference',
        type: String
    }),
    __metadata("design:type", String)
], PaymentVerificationDto.prototype, "reference", void 0);
exports.PaymentVerificationDto = PaymentVerificationDto;
class WithdrawDto {
}
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'payment reference',
        type: String
    }),
    __metadata("design:type", String)
], WithdrawDto.prototype, "accountNumber", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'payment reference',
        type: String
    }),
    __metadata("design:type", String)
], WithdrawDto.prototype, "accountHolder", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'payment reference',
        type: String
    }),
    __metadata("design:type", String)
], WithdrawDto.prototype, "bankName", void 0);
exports.WithdrawDto = WithdrawDto;
class ConfirmWithdrawDto {
}
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'secure OTP sent to vendor phone',
        type: String
    }),
    __metadata("design:type", String)
], ConfirmWithdrawDto.prototype, "otp", void 0);
exports.ConfirmWithdrawDto = ConfirmWithdrawDto;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["CREATED"] = "NEW";
    OrderStatus["ACCEPTED"] = "IN_PROGRESS";
    OrderStatus["COMPLETED"] = "COMPLETED";
    OrderStatus["CANCELLED"] = "CANCELLED";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
var DispatchStatus;
(function (DispatchStatus) {
    DispatchStatus["CREATED"] = "NEW";
    DispatchStatus["STARTED"] = "IN_PROGRESS";
    DispatchStatus["DELIVERED"] = "DELIVERED";
})(DispatchStatus = exports.DispatchStatus || (exports.DispatchStatus = {}));
class ChangePasswordDto {
}
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'old password',
        type: String
    }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "oldPassword", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'new password',
        type: String
    }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "newPassword", void 0);
exports.ChangePasswordDto = ChangePasswordDto;
class CreateCheckoutDto {
}
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'order id',
        type: String
    }),
    __metadata("design:type", String)
], CreateCheckoutDto.prototype, "orderId", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'order amount',
        type: Number
    }),
    __metadata("design:type", Number)
], CreateCheckoutDto.prototype, "amount", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'email of the user',
        type: [String]
    }),
    __metadata("design:type", Array)
], CreateCheckoutDto.prototype, "channels", void 0);
exports.CreateCheckoutDto = CreateCheckoutDto;
class CreateSubAccountDto {
}
exports.CreateSubAccountDto = CreateSubAccountDto;
class VerifyEmailDto {
}
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'token to verify email address',
        type: String
    }),
    __metadata("design:type", String)
], VerifyEmailDto.prototype, "token", void 0);
__decorate([
    validators.IsNotEmpty(),
    swagger.ApiProperty({
        description: 'user registered email address',
        type: String
    }),
    __metadata("design:type", String)
], VerifyEmailDto.prototype, "email", void 0);
exports.VerifyEmailDto = VerifyEmailDto;
//# sourceMappingURL=fs.dtos.js.map