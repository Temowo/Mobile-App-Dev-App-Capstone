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
exports.AuthService = void 0;
const data_services_abstract_1 = require("../core/abstracts/data_services.abstract");
const common_1 = require("@nestjs/common");
const utils_jwt_token_manager_1 = require("../utils/utils.jwt.token_manager");
const utils_token_extractor_1 = require("../utils/utils.token_extractor");
const bcrypt = require("bcrypt");
const dtos = require("../core/dtos/fs.dtos");
const event_emitter_1 = require("@nestjs/event-emitter");
const utils_string_generator_1 = require("../utils/utils.string_generator");
const cache_manager_1 = require("@nestjs/cache-manager");
let AuthService = class AuthService {
    constructor(dataService, tokenManager, extractor, eventEmitter, stringGenerator, cacheManager) {
        this.dataService = dataService;
        this.tokenManager = tokenManager;
        this.extractor = extractor;
        this.eventEmitter = eventEmitter;
        this.stringGenerator = stringGenerator;
        this.cacheManager = cacheManager;
    }
    async addAdmin(admin) {
        const hashedPassword = await bcrypt.hash(admin.password, await bcrypt.genSalt());
        admin.password = hashedPassword;
        admin.phone = `234${admin.phone.replace(admin.phone.charAt(0), '')}`;
        try {
            let newAdmin = await this.dataService.users.create(Object.assign(Object.assign({}, admin), { status: "INACTIVE", role: dtos.Roles.ADMIN, joinDate: new Date() }));
            let verificationCode = this.stringGenerator.generateRandomString(6);
            await this.cacheManager.set(`verify_${verificationCode}`, newAdmin.email);
            this.eventEmitter.emit('userCreated', { name: admin.name, verificationCode, address: admin.email });
            return {
                success: true,
                message: 'admin added successfully'
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.keyPattern['email']
                    ? 'account with that email already exist'
                    : error.keyPattern['phone']
                        ? 'account with that email already exist'
                        : 'provide valid data'
            };
        }
    }
    async registerVendor(persona) {
        let dbVendor = await this.dataService.users.getOne('email', persona.email);
        if (dbVendor) {
            throw new common_1.BadRequestException('Account already exits');
        }
        const hashedPassword = await bcrypt.hash(persona.password, await bcrypt.genSalt());
        persona.password = hashedPassword;
        persona.phone = `234${persona.phone.replace(persona.phone.charAt(0), '')}`;
        let newVendor = await this.dataService.users.create(Object.assign(Object.assign({}, persona), { status: "INACTIVE", orderFeePercentage: persona.orderFeePercentage, role: dtos.Roles.VENDOR, joinDate: new Date() }));
        let verificationCode = this.stringGenerator.generateRandomString(6);
        await this.cacheManager.set(`verify_${verificationCode}`, newVendor.email);
        this.eventEmitter.emit('userCreated', { address: newVendor.email, verificationCode, name: newVendor.name });
        this.eventEmitter.emit('create_customer', {
            name: newVendor.name,
            email: newVendor.email,
            phone: newVendor.phone
        });
        return {
            success: true,
            message: 'vendor registered successfully',
        };
    }
    async registerPersona(persona) {
        let dbUser = await this.dataService.users.getOne('auth_email', persona.email);
        if (dbUser) {
            throw new common_1.BadRequestException('Account already exits');
        }
        const hashedPassword = await bcrypt.hash(persona.password, await bcrypt.genSalt());
        persona.password = hashedPassword;
        persona.phone = `234${persona.phone.replace(persona.phone.charAt(0), '')}`;
        let role = 'user' ? dtos.Roles.USER : dtos.Roles.RIDER;
        let newUser = await this.dataService.users.create(Object.assign(Object.assign({}, persona), { status: "INACTIVE", role, joinDate: new Date() }));
        let verificationCode = this.stringGenerator.generateRandomString(6);
        await this.cacheManager.set(`verify_${verificationCode}`, newUser.email);
        this.eventEmitter.emit('userCreated', { address: newUser.email, verificationCode, name: newUser.name });
        return {
            success: true,
            message: 'user registered successfully',
        };
    }
    async resendVerifyToken(email) {
        let user = await this.dataService.users.getOne('auth_email', email);
        if (!user._id) {
            throw new common_1.UnauthorizedException('Account does not exist');
        }
        let verificationCode = this.stringGenerator.generateRandomString(6);
        await this.cacheManager.set(`verify_${verificationCode}`, user.email);
        this.eventEmitter.emit('resendVerifyToken', { address: user.email, verificationCode });
        return {
            success: true,
            message: "email verification token sent."
        };
    }
    async verifyEmail(data) {
        let email2Verify = await this.cacheManager.get(`verify_${data.token}`);
        if (email2Verify !== data.email) {
            throw new common_1.UnauthorizedException('incorrect email address/token expired ');
        }
        let user = await this.dataService.users.getOne('auth_email', email2Verify);
        user.status = "ACTIVE";
        await this.dataService.users.update(user._id.toString(), user);
        await this.cacheManager.del(`verify_${data.token}`);
        return {
            success: true,
            message: "email verified."
        };
    }
    async signIn(creds) {
        let user = await this.dataService.users.getOne('auth_email', creds.email);
        if (!user) {
            throw new common_1.UnauthorizedException('incorrect email/password entered');
        }
        if (user.status === "INACTIVE") {
            throw new common_1.UnauthorizedException('your email address is not verified');
        }
        const isMatch = await bcrypt.compare(creds.password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('incorrect email/password entered');
        }
        const tokenPayload = { sub: user._id, role: user.role };
        const token = await this.tokenManager.signToken(tokenPayload);
        const user_profile = await this.dataService.address.getByField('user_address', user._id);
        return { success: true, message: 'access tokens generated', data: Object.assign({ user, address: user_profile }, token) };
    }
    async refreshAccessToken(request) {
        const token = this.extractor.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.ForbiddenException('invalid/missing token');
        }
        const paylod = await this.tokenManager.verifyToken(token);
        return this.tokenManager.signRefreshedToken(paylod);
    }
    async forgetPassword(recoveryDto) {
        let user = await this.dataService.users.getOne('auth_email', recoveryDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException('That account does not exit');
        }
        let token = this.stringGenerator.generateRandomString(6);
        await this.cacheManager.set(`reset_${token}`, user.email);
        this.eventEmitter.emit('recoverPass', { address: recoveryDto.email, token });
        return {
            success: true,
            message: 'password reset link sent',
        };
    }
    async resetPassword(password, token) {
        if (!password && !token) {
            throw new common_1.BadRequestException('invalid request data');
        }
        let email2Reset = await this.cacheManager.get(`reset_${token}`);
        const user = await this.dataService.users.getOne('auth_email', email2Reset);
        if (!user) {
            throw new common_1.UnauthorizedException('That account does not exit');
        }
        let hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync());
        user.password = hashedPassword;
        await this.dataService.users.update(user._id.toString(), user);
        await this.cacheManager.del(`reset_${token}`);
        return {
            success: true,
            message: 'password updated successfully',
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [data_services_abstract_1.IDataServices,
        utils_jwt_token_manager_1.TokenManager,
        utils_token_extractor_1.TokenExtractor,
        event_emitter_1.EventEmitter2,
        utils_string_generator_1.StringGenerator, Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.services.js.map