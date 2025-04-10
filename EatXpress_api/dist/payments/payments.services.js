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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const data_services_abstract_1 = require("../core/abstracts/data_services.abstract");
const payments_paystack_service_1 = require("./payments.paystack_service");
const event_emitter_1 = require("@nestjs/event-emitter");
let PaymentService = class PaymentService {
    constructor(dataService, configService, paystackService, eventEmitter) {
        this.dataService = dataService;
        this.configService = configService;
        this.paystackService = paystackService;
        this.eventEmitter = eventEmitter;
        this.ipWhiteList = ["52.31.139.75", "52.49.173.169", "52.214.14.220"];
    }
    async verifyTransaction(reference) {
        return await this.paystackService.verifyTransaction(reference);
    }
    async createCheckout(checkoutDto) {
        return await this.paystackService.createCheckout(checkoutDto);
    }
    async handleWebhook(data) {
        const isWhiteListed = this.ipWhiteList.includes(data.data.ip_address);
        if ((data.event === "charge.success") && isWhiteListed) {
            this.eventEmitter.emit('set_order_paid', data.data.reference);
        }
        else {
            console.log(`ip_address mismatch for order with reference ${data.data.reference}`);
        }
    }
    async getTransactions(userId) {
    }
    async startWithdrawal(withdrawDto) { }
    async confirmWithdrawal(otp) { }
};
PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [data_services_abstract_1.IDataServices,
        config_1.ConfigService,
        payments_paystack_service_1.PayStackService,
        event_emitter_1.EventEmitter2])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payments.services.js.map