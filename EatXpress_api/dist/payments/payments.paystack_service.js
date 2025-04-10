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
exports.PayStackService = void 0;
const axios_1 = require("axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const dtos = require("../core/dtos/fs.dtos");
const data_services_abstract_1 = require("../core/abstracts/data_services.abstract");
const utils_string_generator_1 = require("../utils/utils.string_generator");
const event_emitter_1 = require("@nestjs/event-emitter");
let PayStackService = class PayStackService {
    constructor(configService, dataService, stringGenerator, eventEmitter) {
        this.configService = configService;
        this.dataService = dataService;
        this.stringGenerator = stringGenerator;
        this.eventEmitter = eventEmitter;
        this.baseUrl = this.configService.get('payStackUrl');
        this.paystackSecret = this.configService.get('paystackSecret');
        this.paystackKey = this.configService.get('paystackKey');
    }
    async createSubaccount(data) {
        let response = await this.sendRequest("POST", "/subaccount", {
            business_name: data.business_name,
            bank_code: data.bank_code,
            account_number: data.account_number,
            percentage_charge: data.percentage_charge
        });
        if (!response.status) {
            console.log(response.message);
        }
        this.eventEmitter.emit('update_subaccount', { subaacountCode: response.data.subaccount_code, vendorId: data.vendor });
    }
    async createCheckout(data) {
        let order = await this.dataService.orders.getById(data.orderId);
        let vendor = await this.dataService.users.getById(order.vendor.toString());
        let response = await this.sendRequest("POST", "/transaction/initialize", { email: vendor.email,
            amount: data.amount,
            subaccount: vendor.subAccountCode,
            channels: data.channels,
            reference: `${this.stringGenerator.generateRandomString(6)}-${Date.now()}`
        });
        if (!response.status) {
            throw new common_1.BadRequestException(response.message);
        }
        this.eventEmitter.emit('set_order_ref_auth', {
            orderId: data.orderId,
            reference: response.data.reference,
            checkout_url: response.data.authorization_url
        });
        return {
            success: true,
            message: response.message,
            data: {
                checkout_url: response.data.authorization_url
            }
        };
    }
    async verifyTransaction(reference) {
        let response = await this.sendRequest('GET', `/transaction/verify/${reference}`);
        if (response.status) {
            return {
                success: true,
                message: response.message,
            };
        }
        else {
            return {
                success: false,
                message: 'payment has not been confirmed'
            };
        }
    }
    async getTransactions() {
        let transactions;
        let response = await this.sendRequest('GET', '/transaction');
    }
    sendRequest(method, endpoint, data) {
        return new Promise((resolve, reject) => {
            if (method === 'POST') {
                axios_1.default.post(`${this.baseUrl}/${endpoint}`, JSON.stringify(data), {
                    headers: {
                        Authorization: `Bearer ${this.paystackSecret}`,
                        'Content-Type': "application/json"
                    }
                })
                    .then(response => resolve(response.data))
                    .catch(error => reject(error.message));
            }
            else {
                axios_1.default.get(`${this.baseUrl}/${endpoint}`, {
                    headers: {
                        Authorization: `Bearer ${this.paystackSecret}`,
                    }
                })
                    .then(response => resolve(response.data))
                    .catch(error => reject(error.message));
            }
        });
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('create_subaccount', { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PayStackService.prototype, "createSubaccount", null);
PayStackService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        data_services_abstract_1.IDataServices,
        utils_string_generator_1.StringGenerator,
        event_emitter_1.EventEmitter2])
], PayStackService);
exports.PayStackService = PayStackService;
//# sourceMappingURL=payments.paystack_service.js.map