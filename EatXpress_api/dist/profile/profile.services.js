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
exports.ProfileService = void 0;
const data_services_abstract_1 = require("../core/abstracts/data_services.abstract");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const event_emitter_1 = require("@nestjs/event-emitter");
const banks_1 = require("../utils/banks");
let ProfileService = class ProfileService {
    constructor(dataService, evenEmitter) {
        this.dataService = dataService;
        this.evenEmitter = evenEmitter;
    }
    async saveAddress(address, id, prioritize) {
        let user = await this.dataService.users.getById(id);
        if (!user)
            throw new common_1.NotFoundException('Account not found');
        if (prioritize) {
            let defaultAddress = await this.dataService.address.getOne('user_default_address', id);
            if (defaultAddress._id) {
                defaultAddress.default = false;
                await this.dataService.address.update(defaultAddress._id.toString(), defaultAddress);
            }
            await this.dataService.address.create(Object.assign(Object.assign({}, address), { user: user._id, default: true }));
        }
        else {
            await this.dataService.address.create(Object.assign(Object.assign({}, address), { user: user._id, default: false }));
        }
        let newUseraddressList = await this.dataService.address.getByField('user_address', user._id);
        return {
            success: true,
            message: 'address created',
            data: {
                user,
                newUseraddressList
            }
        };
    }
    async getProfile(Id) {
        let user = await this.dataService.users.getById(Id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        let address = await this.dataService.address.getByField('user_address', user._id);
        return {
            success: true,
            message: 'profile retreived',
            data: {
                user,
                address
            }
        };
    }
    async getAll() {
        let addressList = await this.dataService.address.getAll();
        return {
            success: true,
            message: 'users address list',
            data: addressList
        };
    }
    async changePassword(Id, oldPassword, newPassword) {
        try {
            let user = await this.dataService.users.getById(Id);
            if (!user)
                throw new common_1.NotFoundException('account does not exist');
            if (oldPassword === newPassword) {
                throw new common_1.BadRequestException('the password has been used by you');
            }
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                throw new common_1.BadRequestException('password does not match');
            }
            const hashedPassword = await bcrypt.hash(newPassword, await bcrypt.genSalt());
            user.password = hashedPassword;
            await this.dataService.users.update(user._id.toString(), user);
            return {
                success: true,
                message: 'password changed successfully'
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async saveVendorBankDetails(bankDetailsDto, vendorId) {
        let vendor = await this.dataService.users.getById(vendorId);
        if (!vendor._id) {
            throw new common_1.NotFoundException('Account not found');
        }
        let payload = {
            business_name: bankDetailsDto.business_name,
            bank_code: banks_1.bankCodes.filter(bank => bank.name === bankDetailsDto.bank)[0].code,
            account_number: bankDetailsDto.account_number,
            percentage_charge: vendor.orderFeePercentage / 100,
            vendor: vendorId
        };
        this.evenEmitter.emit('create_subaccount', payload);
        return {
            success: true,
            message: "your bank info is been saved for easy funds collection"
        };
    }
    async updateSubaccountCode(data) {
        let vendor = await this.dataService.users.getById(data.vendorId);
        vendor.subAccountCode = data.subaccountCode;
        await this.dataService.users.update(vendor._id.toString(), vendor);
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('update_subaccount', { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileService.prototype, "updateSubaccountCode", null);
ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [data_services_abstract_1.IDataServices,
        event_emitter_1.EventEmitter2])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.services.js.map