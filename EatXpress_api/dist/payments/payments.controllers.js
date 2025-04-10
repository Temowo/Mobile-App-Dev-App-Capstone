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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payments_services_1 = require("./payments.services");
const swagger = require("@nestjs/swagger");
const guards_roles_1 = require("../guards/guards.roles");
const dtos = require("../core/dtos/fs.dtos");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    createCheckout(checkoutDto) {
        return this.paymentService.createCheckout(checkoutDto);
    }
    async handleWebhook(data, res) {
        res.sendStatus(200).end();
        this.paymentService.handleWebhook(data);
    }
};
__decorate([
    (0, common_1.Post)('/checkout'),
    swagger.ApiBearerAuth(),
    swagger.ApiCreatedResponse({
        description: 'checkout created',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request payload',
    }),
    swagger.ApiBody({ type: dtos.CreateCheckoutDto }),
    (0, guards_roles_1.Roles)(dtos.Roles.ADMIN, dtos.Roles.USER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "createCheckout", null);
__decorate([
    (0, common_1.Post)('/webhook'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "handleWebhook", null);
PaymentController = __decorate([
    (0, common_1.Injectable)(),
    swagger.ApiTags('auth'),
    (0, common_1.Controller)('api/payments'),
    __metadata("design:paramtypes", [payments_services_1.PaymentService])
], PaymentController);
exports.PaymentController = PaymentController;
//# sourceMappingURL=payments.controllers.js.map