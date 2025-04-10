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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_services_1 = require("./auth.services");
const dtos = require("../core/dtos/fs.dtos");
const swagger = require("@nestjs/swagger");
const guards_role_guard_1 = require("../guards/guards.role_guard");
const guards_roles_1 = require("../guards/guards.roles");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    registerVendor(persona) {
        return this.authService.registerVendor(persona);
    }
    addAdmin(persona) {
        return this.authService.addAdmin(persona);
    }
    registerPersona(persona) {
        return this.authService.registerPersona(persona);
    }
    verifyEmail(verifyDto) {
        return this.authService.verifyEmail(verifyDto);
    }
    signIn(creds) {
        return this.authService.signIn(creds);
    }
    refreshAccessToken(req) {
        return this.authService.refreshAccessToken(req);
    }
    forgetPass(recoveryDto) {
        return this.authService.forgetPassword(recoveryDto);
    }
    resetPass(resetDto) {
        return this.authService.resetPassword(resetDto.password, resetDto.token);
    }
};
__decorate([
    (0, common_1.Post)('/register/vendor'),
    swagger.ApiBearerAuth(),
    swagger.ApiCreatedResponse({
        description: 'new vendor registered',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request payload',
    }),
    swagger.ApiBody({ type: dtos.RegisterVendorDto }),
    (0, guards_roles_1.Roles)(dtos.Roles.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "registerVendor", null);
__decorate([
    (0, common_1.Post)('/register/admin'),
    swagger.ApiBearerAuth(),
    swagger.ApiCreatedResponse({
        description: 'add new admin',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request payload',
    }),
    swagger.ApiBody({ type: dtos.RegisterAdminDto }),
    (0, guards_roles_1.Roles)(dtos.Roles.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "addAdmin", null);
__decorate([
    (0, common_1.Post)('/register'),
    swagger.ApiCreatedResponse({
        description: 'new user | rider registered',
        type: dtos.ResponseDto
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request payload',
    }),
    swagger.ApiBody({ type: dtos.RegisterDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "registerPersona", null);
__decorate([
    (0, common_1.Post)('/verify-email'),
    swagger.ApiOkResponse({
        description: 'email address verification completed',
        type: dtos.ResponseDto
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request payload',
    }),
    swagger.ApiBody({ type: dtos.VerifyEmailDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)('/login'),
    swagger.ApiOkResponse({
        description: 'successful login with access token generated',
        type: dtos.ResponseDto
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request payload',
    }),
    swagger.ApiBody({ type: dtos.LoginDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Get)('/refresh-token'),
    swagger.ApiBearerAuth(),
    swagger.ApiOkResponse({
        description: 'access token refreshed',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'invalid/missing request headers',
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.ADMIN, dtos.Roles.VENDOR, dtos.Roles.USER, dtos.Roles.RIDER),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshAccessToken", null);
__decorate([
    (0, common_1.Post)('/forget-pass'),
    swagger.ApiOkResponse({
        description: 'password recovery link sent to user | vendor | rider | admin inbox',
        type: dtos.ResponseDto
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request payload',
    }),
    swagger.ApiBody({ type: dtos.ForgetPasswordDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "forgetPass", null);
__decorate([
    (0, common_1.Post)('/reset-password'),
    swagger.ApiOkResponse({
        description: 'password reset operation completed',
        type: dtos.ResponseDto
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request payload',
    }),
    swagger.ApiBody({ type: dtos.PasswordResetDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPass", null);
AuthController = __decorate([
    swagger.ApiTags('auth'),
    (0, common_1.Controller)('/api/auth'),
    (0, common_1.UseGuards)(guards_role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [auth_services_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controllers.js.map