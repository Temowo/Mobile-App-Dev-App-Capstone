"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongo_data_module_1 = require("./mongo_data/mongo_data.module");
const configurations_1 = require("./configs/configurations");
const data_access_module_1 = require("./data_access/data_access.module");
const auth_module_1 = require("./auth/auth.module");
const messaging_module_1 = require("./messaging/messaging.module");
const admin_module_1 = require("./admin/admin.module");
const middlewares_module_1 = require("./middlewares/middlewares.module");
const guards_module_1 = require("./guards/guards.module");
const utils_module_1 = require("./utils/utils.module");
const middlewares_auth_middleware_1 = require("./middlewares/middlewares.auth_middleware");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const profile_module_1 = require("./profile/profile.module");
const menu_module_1 = require("./menu/menu.module");
const order_module_1 = require("./order/order.module");
const platform_express_1 = require("@nestjs/platform-express");
const dispatch_module_1 = require("./dispatch/dispatch.module");
const payments_module_1 = require("./payments/payments.module");
const cache_manager_1 = require("@nestjs/cache-manager");
const event_emitter_1 = require("@nestjs/event-emitter");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(middlewares_auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'api/auth/register/vendor', method: common_1.RequestMethod.POST })
            .apply(middlewares_auth_middleware_1.AuthMiddleware)
            .forRoutes('/api/profile')
            .apply(middlewares_auth_middleware_1.AuthMiddleware)
            .forRoutes('/api/menu')
            .apply(middlewares_auth_middleware_1.AuthMiddleware)
            .forRoutes('/api/orders')
            .apply(middlewares_auth_middleware_1.AuthMiddleware)
            .forRoutes('/api/dispatch')
            .apply(middlewares_auth_middleware_1.AuthMiddleware)
            .forRoutes('/api/payments');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configurations_1.default],
                isGlobal: true,
            }),
            mongo_data_module_1.MongoDataModule,
            data_access_module_1.DataAccessModule,
            middlewares_module_1.MiddlewaresModule,
            guards_module_1.GuardsModule,
            utils_module_1.UtilsModule,
            auth_module_1.AuthModule,
            admin_module_1.AdminModule,
            profile_module_1.ProfileModule,
            menu_module_1.MenuModule,
            order_module_1.OrderModule,
            dispatch_module_1.DispatchModule,
            payments_module_1.PaymentsModule,
            messaging_module_1.MessagingModule,
            platform_express_1.MulterModule.register({
                dest: './uploads',
            }),
            cache_manager_1.CacheModule.register({
                isGlobal: true,
                ttl: 840000
            }),
            event_emitter_1.EventEmitterModule.forRoot()
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map