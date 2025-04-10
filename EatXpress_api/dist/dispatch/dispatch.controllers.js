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
exports.DispatchController = void 0;
const common_1 = require("@nestjs/common");
const dispatch_services_1 = require("./dispatch.services");
const dtos = require("../core/dtos/fs.dtos");
const swagger = require("@nestjs/swagger");
const guards_role_guard_1 = require("../guards/guards.role_guard");
const guards_roles_1 = require("../guards/guards.roles");
let DispatchController = class DispatchController {
    constructor(dispatchService) {
        this.dispatchService = dispatchService;
    }
    async acceptDispatch(dispatchId, req) {
        return this.dispatchService.acceptDispatch(dispatchId, req.user.id);
    }
    async completeDispatch(dispatchId) {
        this.dispatchService.completeDispatch(dispatchId);
    }
    async getDispatch(dispatchId) {
        return this.dispatchService.getDispatch(dispatchId);
    }
    async getRiderDispatch(req) {
        return this.dispatchService.getRiderDispatch(req.user.id);
    }
    async updateRiderLocation(geos, req) {
        await this.dispatchService.updateRiderLocation(req.user.id, geos);
        return {
            success: true,
            message: 'Location updated'
        };
    }
    async trackDispatch(dispatchId) {
        return this.dispatchService.trackDispatchRider(dispatchId);
    }
};
__decorate([
    (0, common_1.Get)('/accept/:dispatchId'),
    swagger.ApiBearerAuth(),
    swagger.ApiOkResponse({
        description: 'dispatch accepted by rider...',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.RIDER, dtos.Roles.ADMIN),
    __param(0, (0, common_1.Param)('dispatchId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "acceptDispatch", null);
__decorate([
    (0, common_1.Get)('complete/:dispatchId'),
    (0, guards_roles_1.Roles)(dtos.Roles.RIDER, dtos.Roles.ADMIN),
    __param(0, (0, common_1.Param)('dispatchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "completeDispatch", null);
__decorate([
    (0, common_1.Get)('/:dispatchId'),
    swagger.ApiBearerAuth(),
    swagger.ApiOkResponse({
        description: 'dispatch retreived...',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.VENDOR, dtos.Roles.USER, dtos.Roles.RIDER, dtos.Roles.ADMIN),
    __param(0, (0, common_1.Param)('dispatchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "getDispatch", null);
__decorate([
    (0, common_1.Get)('/rider'),
    swagger.ApiBearerAuth(),
    swagger.ApiOkResponse({
        description: 'rider dispatch retreived...',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.RIDER, dtos.Roles.ADMIN),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "getRiderDispatch", null);
__decorate([
    (0, common_1.Post)('/locations'),
    swagger.ApiBearerAuth(),
    swagger.ApiOkResponse({
        description: 'rider location updated...',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request payload',
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.RIDER, dtos.Roles.ADMIN),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "updateRiderLocation", null);
__decorate([
    (0, common_1.Get)('/tracking/:dispatchId'),
    swagger.ApiBearerAuth(),
    swagger.ApiOkResponse({
        description: 'rider location retreived...',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.RIDER, dtos.Roles.ADMIN),
    __param(0, (0, common_1.Param)('dispatchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "trackDispatch", null);
DispatchController = __decorate([
    swagger.ApiTags('dispatch'),
    (0, common_1.UseGuards)(guards_role_guard_1.RolesGuard),
    (0, common_1.Injectable)(),
    (0, common_1.Controller)('api/dispatch'),
    __metadata("design:paramtypes", [dispatch_services_1.DispatchService])
], DispatchController);
exports.DispatchController = DispatchController;
//# sourceMappingURL=dispatch.controllers.js.map