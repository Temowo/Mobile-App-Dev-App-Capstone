"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const data_access_module_1 = require("../data_access/data_access.module");
const auth_controllers_1 = require("./auth.controllers");
const auth_services_1 = require("./auth.services");
const guards_module_1 = require("../guards/guards.module");
const utils_module_1 = require("../utils/utils.module");
const messaging_module_1 = require("../messaging/messaging.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            data_access_module_1.DataAccessModule,
            guards_module_1.GuardsModule,
            utils_module_1.UtilsModule,
            messaging_module_1.MessagingModule,
        ],
        controllers: [auth_controllers_1.AuthController],
        providers: [auth_services_1.AuthService],
        exports: [],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map