"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDataModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const data_services_abstract_1 = require("../core/abstracts/data_services.abstract");
const config_1 = require("@nestjs/config");
const fsModels = require("./models/models");
const mongo_data_services_1 = require("./mongo_data.services");
let MongoDataModule = class MongoDataModule {
};
MongoDataModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            mongoose_1.MongooseModule.forFeature([
                { name: fsModels.Transaction.name, schema: fsModels.TransactionSchema },
                { name: fsModels.Dispatch.name, schema: fsModels.DispatchSchema },
                { name: fsModels.Order.name, schema: fsModels.OrderSchema },
                { name: fsModels.Menu.name, schema: fsModels.MenuSchema },
                { name: fsModels.User.name, schema: fsModels.UserSchema },
                { name: fsModels.Address.name, schema: fsModels.AddressSchema },
            ]),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('dbUri'),
                }),
                inject: [config_1.ConfigService],
            })
        ],
        providers: [
            {
                provide: data_services_abstract_1.IDataServices,
                useClass: mongo_data_services_1.MongoDataService,
            }
        ],
        exports: [data_services_abstract_1.IDataServices],
    })
], MongoDataModule);
exports.MongoDataModule = MongoDataModule;
//# sourceMappingURL=mongo_data.module.js.map