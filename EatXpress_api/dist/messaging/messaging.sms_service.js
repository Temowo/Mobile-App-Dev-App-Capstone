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
exports.SmsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let SmsService = class SmsService {
    constructor(configService) {
        this.configService = configService;
    }
    async sendTest(message, phone) {
        await this.sendSMS(message, phone);
    }
    async sendNewVendorOrderAlert(text, phone) {
        await this.sendSMS(text, phone);
    }
    async sendOrderCompleted(text, phone) {
        await this.sendSMS(text, phone);
    }
    async sendDispatchAccepted(text, phone) {
        await this.sendSMS(text, phone);
    }
    async sendSMS(message, to) {
        try {
            const headers = {
                "Content-Type": "application/json",
            };
            const data1 = {
                to: "2348136460333",
                from: "FoodSwipe",
                sms: "Termii integration test passed",
                type: "plain",
                channel: "generic",
                api_key: ""
            };
            const smsUrl = `${this.configService.getOrThrow('smsUrl')}`;
            const data = {
                to: to.replace("+", ""),
                from: this.configService.get('smsId'),
                sms: message,
                type: "plain",
                channel: "generic",
                api_key: this.configService.get('smsKey')
            };
            const response = await axios_1.default.post(smsUrl, JSON.stringify(data), { headers });
            console.log(response);
        }
        catch (error) {
            console.log('sms', error, error.code, error.message);
        }
    }
};
SmsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SmsService);
exports.SmsService = SmsService;
//# sourceMappingURL=messaging.sms_service.js.map