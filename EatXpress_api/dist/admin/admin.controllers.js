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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_services_1 = require("./admin.services");
const guards_roles_1 = require("../guards/guards.roles");
const swagger = require("@nestjs/swagger");
const dtos = require("../core/dtos/fs.dtos");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    getVendors() {
        return this.adminService.getVendors();
    }
    getVendor(vendorId) {
        return this.adminService.getVendor(vendorId);
    }
    getUsers() {
        return this.adminService.getUsers();
    }
    getUser(userId) {
        return this.adminService.getUser(userId);
    }
    getRiders() {
        return this.adminService.getRiders();
    }
    getRider(riderId) {
        return this.adminService.getRider(riderId);
    }
};
__decorate([
    (0, common_1.Get)('/vendors'),
    swagger.ApiOkResponse({
        description: 'list of all vendors registered',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'limited access to resource',
        type: dtos.ResponseDto
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getVendors", null);
__decorate([
    (0, common_1.Get)('/vendor/:vendorId'),
    swagger.ApiOkResponse({
        description: 'vendor data',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'limited access to resource',
        type: dtos.ResponseDto
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.ADMIN),
    __param(0, (0, common_1.Param)('vendorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getVendor", null);
__decorate([
    (0, common_1.Get)('/users'),
    swagger.ApiOkResponse({
        description: 'list of all users registered',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'limited access to resource',
        type: dtos.ResponseDto
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('/user/:userId'),
    swagger.ApiOkResponse({
        description: 'user data',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'limited access to resource',
        type: dtos.ResponseDto
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.ADMIN),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('/riders'),
    swagger.ApiOkResponse({
        description: 'list of all riders registered',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'limited access to resource',
        type: dtos.ResponseDto
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getRiders", null);
__decorate([
    (0, common_1.Get)('/rider/:riderId'),
    swagger.ApiOkResponse({
        description: 'rider data',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'limited access to resource',
        type: dtos.ResponseDto
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.ADMIN),
    __param(0, (0, common_1.Param)('riderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getRider", null);
AdminController = __decorate([
    swagger.ApiTags('admin'),
    (0, common_1.Controller)('/api/admin'),
    __metadata("design:paramtypes", [admin_services_1.AdminServices])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controllers.js.map