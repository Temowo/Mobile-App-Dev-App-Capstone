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
exports.AdminServices = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const data_services_abstract_1 = require("../core/abstracts/data_services.abstract");
let AdminServices = class AdminServices {
    constructor(configService, dataService) {
        this.configService = configService;
        this.dataService = dataService;
    }
    async getVendors() {
        const vendors = await this.dataService.users.getByField('role', "VENDOR");
        return {
            success: true,
            message: "vendor list retrieved",
            data: vendors
        };
    }
    async getVendor(vendorId) {
        const vendor = await this.dataService.users.getById(vendorId);
        return {
            success: true,
            message: "vendor list retrieved",
            data: vendor
        };
    }
    async getUsers() {
        const users = await this.dataService.users.getByField('role', "USER");
        return {
            success: true,
            message: "vendor list retrieved",
            data: users
        };
    }
    async getUser(userId) {
        const user = await this.dataService.users.getById(userId);
        return {
            success: true,
            message: "vendor list retrieved",
            data: user
        };
    }
    async getRiders() {
        const riders = await this.dataService.users.getByField('role', "RIDER");
        return {
            success: true,
            message: "vendor list retrieved",
            data: riders
        };
    }
    async getRider(riderId) {
        const rider = await this.dataService.users.getById(riderId);
        return {
            success: true,
            message: "vendor list retrieved",
            data: rider
        };
    }
};
AdminServices = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        data_services_abstract_1.IDataServices])
], AdminServices);
exports.AdminServices = AdminServices;
//# sourceMappingURL=admin.services.js.map