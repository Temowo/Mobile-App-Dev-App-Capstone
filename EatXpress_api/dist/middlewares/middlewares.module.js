"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewaresModule = void 0;
const common_1 = require("@nestjs/common");
const utils_module_1 = require("../utils/utils.module");
const middlewares_auth_middleware_1 = require("./middlewares.auth_middleware");
const middlewares_payment_webhook_1 = require("./middlewares.payment_webhook");
let MiddlewaresModule = class MiddlewaresModule {
};
MiddlewaresModule = __decorate([
    (0, common_1.Module)({
        imports: [utils_module_1.UtilsModule],
        providers: [middlewares_auth_middleware_1.AuthMiddleware, middlewares_payment_webhook_1.PaymentMiddleware],
        exports: [middlewares_auth_middleware_1.AuthMiddleware, middlewares_payment_webhook_1.PaymentMiddleware]
    })
], MiddlewaresModule);
exports.MiddlewaresModule = MiddlewaresModule;
//# sourceMappingURL=middlewares.module.js.map