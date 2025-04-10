"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchModule = void 0;
const common_1 = require("@nestjs/common");
const data_access_module_1 = require("../data_access/data_access.module");
const dispatch_controllers_1 = require("./dispatch.controllers");
const dispatch_services_1 = require("./dispatch.services");
const utils_module_1 = require("../utils/utils.module");
let DispatchModule = class DispatchModule {
};
DispatchModule = __decorate([
    (0, common_1.Module)({
        imports: [data_access_module_1.DataAccessModule, utils_module_1.UtilsModule],
        controllers: [dispatch_controllers_1.DispatchController],
        providers: [dispatch_services_1.DispatchService],
        exports: [dispatch_services_1.DispatchService]
    })
], DispatchModule);
exports.DispatchModule = DispatchModule;
//# sourceMappingURL=dispatch.module.js.map