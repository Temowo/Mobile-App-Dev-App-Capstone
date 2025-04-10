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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_services_1 = require("./order.services");
const dtos = require("../core/dtos/fs.dtos");
const swagger = require("@nestjs/swagger");
const guards_role_guard_1 = require("../guards/guards.role_guard");
const guards_roles_1 = require("../guards/guards.roles");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    createOrder(createOrderDto, req) {
        return this.orderService.createOrder(createOrderDto, req.user.id);
    }
    getVendorOrders(page = 1, req) {
        return this.orderService.getVendorOrders(req.user.id, page);
    }
    getUserOrders(page, req) {
        return this.orderService.getUserOrders(req.user.id, page);
    }
    getRiderOrders(req) {
        return this.orderService.getRiderOrders(req.user.id);
    }
    getOrderById(orderId) {
        return this.orderService.getById(orderId);
    }
    acceptOrder(orderId) {
        return this.orderService.acceptOrder(orderId);
    }
    cancelOrder(orderId) {
        return this.orderService.cancelOrder(orderId);
    }
    completeOrder(orderId) {
        return this.orderService.completeOrder(orderId);
    }
};
__decorate([
    (0, common_1.Post)(''),
    swagger.ApiBearerAuth(),
    swagger.ApiCreatedResponse({
        description: 'Order created...',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request payload',
    }),
    swagger.ApiBody({ type: dtos.CreateOrderDto }),
    (0, guards_roles_1.Roles)(dtos.Roles.USER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)('/vendors/:page'),
    swagger.ApiBearerAuth(),
    swagger.ApiOkResponse({
        description: 'vendor orders list retrieved...',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.VENDOR),
    __param(0, (0, common_1.Param)('page')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getVendorOrders", null);
__decorate([
    (0, common_1.Get)('/users/:page'),
    swagger.ApiBearerAuth(),
    swagger.ApiOkResponse({
        description: 'vendor orders list retrieved...',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.USER),
    __param(0, (0, common_1.Param)('page')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getUserOrders", null);
__decorate([
    (0, common_1.Get)('/riders'),
    swagger.ApiBearerAuth(),
    swagger.ApiOkResponse({
        description: 'rider orders list retrieved...',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.RIDER),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getRiderOrders", null);
__decorate([
    (0, common_1.Get)('/:orderId'),
    swagger.ApiBearerAuth(),
    swagger.ApiOkResponse({
        description: 'order retrieved...',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.VENDOR, dtos.Roles.USER, dtos.Roles.RIDER, dtos.Roles.ADMIN),
    __param(0, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getOrderById", null);
__decorate([
    (0, common_1.Get)('/accept-order/:orderId'),
    swagger.ApiBearerAuth(),
    swagger.ApiOkResponse({
        description: 'order accepted...',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.VENDOR),
    __param(0, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "acceptOrder", null);
__decorate([
    (0, common_1.Get)('/cancel-order/:orderId'),
    swagger.ApiBearerAuth(),
    swagger.ApiOkResponse({
        description: 'order cancelled...',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.VENDOR),
    __param(0, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "cancelOrder", null);
__decorate([
    (0, common_1.Get)('/complete-order/:orderId'),
    swagger.ApiBearerAuth(),
    swagger.ApiOkResponse({
        description: 'order completed...',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.VENDOR),
    __param(0, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "completeOrder", null);
OrderController = __decorate([
    swagger.ApiTags('order'),
    (0, common_1.Controller)('/api/orders'),
    (0, common_1.UseGuards)(guards_role_guard_1.RolesGuard),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [order_services_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controllers.js.map