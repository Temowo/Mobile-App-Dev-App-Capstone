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
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const utils_jwt_token_manager_1 = require("../utils/utils.jwt.token_manager");
const utils_token_extractor_1 = require("../utils/utils.token_extractor");
let AuthMiddleware = class AuthMiddleware {
    constructor(extractor, tokenManager) {
        this.extractor = extractor;
        this.tokenManager = tokenManager;
    }
    async use(req, res, next) {
        const token = this.extractor.extractTokenFromHeader(req);
        if (!token) {
            throw new common_1.ForbiddenException();
        }
        const payload = await this.tokenManager.verifyToken(token);
        let requestUser = {
            id: payload.sub,
            role: payload.role
        };
        req['user'] = requestUser;
        next();
    }
};
AuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [utils_token_extractor_1.TokenExtractor,
        utils_jwt_token_manager_1.TokenManager])
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=middlewares.auth_middleware.js.map