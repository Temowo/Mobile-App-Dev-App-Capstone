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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const profile_services_1 = require("./profile.services");
const dtos = require("../core/dtos/fs.dtos");
const swagger = require("@nestjs/swagger");
const guards_role_guard_1 = require("../guards/guards.role_guard");
const guards_roles_1 = require("../guards/guards.roles");
let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    createAddress(primary, address, req) {
        return this.profileService.saveAddress(address, req.user.id, primary);
    }
    getProfile(req) {
        return this.profileService.getProfile('648c360641ac1ac420b77f1e');
    }
    getAll() {
        return this.profileService.getAll();
    }
    changePassword(changePassDto, req) {
        return this.profileService.changePassword(req.user.id, changePassDto.oldPassword, changePassDto.newPassword);
    }
    createCheckout(bankDetailsDto, req) {
        return this.profileService.saveVendorBankDetails(bankDetailsDto, req.user.id);
    }
};
__decorate([
    (0, common_1.Post)('/save-address'),
    swagger.ApiBearerAuth(),
    swagger.ApiCreatedResponse({
        description: 'address saved...',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request payload | query parameter',
    }),
    swagger.ApiBody({ type: dtos.createAddressDto }),
    (0, guards_roles_1.Roles)(dtos.Roles.VENDOR, dtos.Roles.USER),
    __param(0, (0, common_1.Query)('primary')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Object, Object]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "createAddress", null);
__decorate([
    (0, common_1.Get)(''),
    swagger.ApiBearerAuth(),
    swagger.ApiOkResponse({
        description: 'address retrieved...',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.VENDOR, dtos.Roles.USER),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('/address'),
    swagger.ApiBearerAuth(),
    swagger.ApiOkResponse({
        description: 'all address retrieved...',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('/change-password'),
    swagger.ApiBearerAuth(),
    swagger.ApiOkResponse({
        description: 'password change successfully...',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid payload',
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.ADMIN, dtos.Roles.VENDOR, dtos.Roles.USER, dtos.Roles.RIDER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos.ChangePasswordDto, Object]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('/bank-details'),
    swagger.ApiBearerAuth(),
    swagger.ApiCreatedResponse({
        description: 'bank deatails saved',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request payload',
    }),
    swagger.ApiBody({ type: dtos.CreateSubAccountDto }),
    (0, guards_roles_1.Roles)(dtos.Roles.ADMIN, dtos.Roles.VENDOR),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "createCheckout", null);
ProfileController = __decorate([
    swagger.ApiTags('profile'),
    (0, common_1.Controller)('/api/profile'),
    (0, common_1.UseGuards)(guards_role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [profile_services_1.ProfileService])
], ProfileController);
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controllers.js.map