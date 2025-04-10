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
exports.MenuService = void 0;
const data_services_abstract_1 = require("../core/abstracts/data_services.abstract");
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const menu_cloudinary_service_1 = require("./menu.cloudinary_service");
const util_1 = require("util");
const fs = require("fs");
let MenuService = class MenuService {
    constructor(dataService, cloudManager) {
        this.dataService = dataService;
        this.cloudManager = cloudManager;
    }
    async createMenu(createMenuDto, file, id) {
        const vendor = await this.dataService.users.getById(id);
        if (!vendor)
            throw new common_1.NotFoundException('Account with that id does not exist');
        const imageUrl = await this.cloudManager.uploadFile(file);
        if (imageUrl === 'upload error')
            throw new common_1.UnprocessableEntityException('error uploading menu image');
        const unlinkAsync = (0, util_1.promisify)(fs.unlink);
        await unlinkAsync(file.path);
        let newMenu = await this.dataService.menus.create(Object.assign(Object.assign({}, createMenuDto), { vendorId: vendor._id, restaurant: vendor.name, imagePath: imageUrl }));
        return {
            success: true,
            message: "new vendor menu created",
            data: {
                menuId: newMenu._id.toString()
            }
        };
    }
    async updateMenuPrice(price, menuId) {
        let menu = await this.dataService.menus.getById(menuId);
        menu.price = price;
        await this.dataService.menus.update(menuId, menu);
        return {
            success: true,
            message: "price updated successfully"
        };
    }
    async getMenus(page = 1) {
        let menus = await this.dataService.menus.getAll();
        return {
            success: true,
            message: "All menu records",
            data: {
                menus,
                nextPage: menus.length === 11 ? true : false
            }
        };
    }
    async getVendorMenus(vendorId) {
        let menus = await this.dataService.menus.getByField("menu_vendorId", new mongodb_1.ObjectId(vendorId));
        return {
            success: true,
            message: menus.length > 0 ? "list of menus by vendor" : "no available menu by this vendor",
            data: menus
        };
    }
    async getMenuById(menuId) {
        try {
            let menu = await this.dataService.menus.getById(menuId);
            return {
                success: true,
                message: menu._id ? "one record found" : "no record found",
                data: menu._id ? menu : null
            };
        }
        catch (error) {
            throw new common_1.NotAcceptableException(error.message);
        }
    }
};
MenuService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [data_services_abstract_1.IDataServices,
        menu_cloudinary_service_1.CloudinaryManager])
], MenuService);
exports.MenuService = MenuService;
//# sourceMappingURL=menu.services.js.map