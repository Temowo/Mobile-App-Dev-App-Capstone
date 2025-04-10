"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuModule = void 0;
const common_1 = require("@nestjs/common");
const data_access_module_1 = require("../data_access/data_access.module");
const config_1 = require("@nestjs/config");
const menu_controllers_1 = require("./menu.controllers");
const menu_services_1 = require("./menu.services");
const menu_cloudinary_service_1 = require("./menu.cloudinary_service");
let MenuModule = class MenuModule {
};
MenuModule = __decorate([
    (0, common_1.Module)({
        imports: [data_access_module_1.DataAccessModule, config_1.ConfigModule],
        controllers: [menu_controllers_1.MenuController],
        providers: [menu_services_1.MenuService, menu_cloudinary_service_1.CloudinaryManager]
    })
], MenuModule);
exports.MenuModule = MenuModule;
//# sourceMappingURL=menu.module.js.map