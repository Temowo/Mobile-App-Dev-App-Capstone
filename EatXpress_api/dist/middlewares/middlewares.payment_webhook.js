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
exports.PaymentMiddleware = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto = require("crypto");
let PaymentMiddleware = class PaymentMiddleware {
    constructor(configService) {
        this.configService = configService;
        this.secret = this.configService.getOrThrow('paystackSecret');
        this.ipWhiteList = ["52.31.139.75", "52.49.173.169", "52.214.14.220"];
    }
    async use(req, res, next) {
        const hash = crypto.createHmac('sha512', this.secret).update(JSON.stringify(req.body)).digest('hex');
        const isWhiteListed = this.ipWhiteList.includes(req.ip);
        if ((hash == req.headers['x-paystack-signature']) && isWhiteListed) {
            next();
        }
        else {
            throw new common_1.NotAcceptableException('invalid event authority');
        }
    }
};
PaymentMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PaymentMiddleware);
exports.PaymentMiddleware = PaymentMiddleware;
//# sourceMappingURL=middlewares.payment_webhook.js.map