"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const utils_jwt_token_manager_1 = require("./utils.jwt.token_manager");
const utils_token_extractor_1 = require("./utils.token_extractor");
const utils_string_generator_1 = require("./utils.string_generator");
let UtilsModule = class UtilsModule {
};
UtilsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('jwtSecret'),
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [utils_jwt_token_manager_1.TokenManager, utils_token_extractor_1.TokenExtractor, utils_string_generator_1.StringGenerator],
        exports: [utils_jwt_token_manager_1.TokenManager, utils_token_extractor_1.TokenExtractor, utils_string_generator_1.StringGenerator],
    })
], UtilsModule);
exports.UtilsModule = UtilsModule;
//# sourceMappingURL=utils.module.js.map