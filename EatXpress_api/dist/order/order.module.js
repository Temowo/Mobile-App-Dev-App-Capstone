"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const data_access_module_1 = require("../data_access/data_access.module");
const messaging_module_1 = require("../messaging/messaging.module");
const order_controllers_1 = require("./order.controllers");
const order_services_1 = require("./order.services");
const dispatch_module_1 = require("../dispatch/dispatch.module");
let OrderModule = class OrderModule {
};
OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            data_access_module_1.DataAccessModule,
            config_1.ConfigModule,
            messaging_module_1.MessagingModule,
            dispatch_module_1.DispatchModule
        ],
        controllers: [order_controllers_1.OrderController],
        providers: [order_services_1.OrderService],
    })
], OrderModule);
exports.OrderModule = OrderModule;
//# sourceMappingURL=order.module.js.map