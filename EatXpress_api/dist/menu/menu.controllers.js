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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuController = void 0;
const common_1 = require("@nestjs/common");
const menu_services_1 = require("./menu.services");
const dtos = require("../core/dtos/fs.dtos");
const swagger = require("@nestjs/swagger");
const guards_role_guard_1 = require("../guards/guards.role_guard");
const guards_roles_1 = require("../guards/guards.roles");
const platform_express_1 = require("@nestjs/platform-express");
let MenuController = class MenuController {
    constructor(menuService) {
        this.menuService = menuService;
    }
    createMenu(createMenuDto, file, req) {
        return this.menuService.createMenu(createMenuDto, file, req.user.id);
    }
    updateMenuPrice(menuId, priceDto) {
        return this.menuService.updateMenuPrice(priceDto.price, menuId);
    }
    getMenus(page) {
        return this.menuService.getMenus(page);
    }
    getMenuByVendor(req) {
        return this.menuService.getVendorMenus(req.user.id);
    }
    getMenuById(menuId) {
        return this.menuService.getMenuById(menuId);
    }
};
__decorate([
    (0, common_1.Post)(''),
    swagger.ApiBearerAuth(),
    swagger.ApiCreatedResponse({
        description: 'Menu created...',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request payload',
    }),
    swagger.ApiConsumes('multipart/form-data'),
    swagger.ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                price: { type: 'integer' },
                description: { type: 'string' },
                mealType: { type: 'string' },
                category: { type: 'string' },
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { dest: './uploads' })),
    (0, guards_roles_1.Roles)(dtos.Roles.VENDOR),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: 'jpeg',
    })
        .addMaxSizeValidator({
        maxSize: 1048576
    })
        .build({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY
    }))),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "createMenu", null);
__decorate([
    (0, common_1.Patch)('/update/:menuId'),
    swagger.ApiBearerAuth(),
    swagger.ApiOkResponse({
        description: ' menu price updated...',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request payload/parameter',
    }),
    swagger.ApiBody({ type: dtos.UpdateMenuPriceDto }),
    (0, guards_roles_1.Roles)(dtos.Roles.VENDOR),
    __param(0, (0, common_1.Param)('menuId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "updateMenuPrice", null);
__decorate([
    (0, common_1.Get)('/:page'),
    swagger.ApiBearerAuth(),
    swagger.ApiOkResponse({
        description: 'menu list retrieved...',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.USER),
    __param(0, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "getMenus", null);
__decorate([
    (0, common_1.Get)('/vendor'),
    swagger.ApiBearerAuth(),
    swagger.ApiOkResponse({
        description: 'vendor menu retrieved...',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.VENDOR),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "getMenuByVendor", null);
__decorate([
    (0, common_1.Get)('/:menuId'),
    swagger.ApiBearerAuth(),
    swagger.ApiOkResponse({
        description: 'menu retrieved...',
        type: dtos.ResponseDto
    }),
    swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    }),
    swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    }),
    (0, guards_roles_1.Roles)(dtos.Roles.VENDOR, dtos.Roles.USER),
    __param(0, (0, common_1.Param)('menuId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "getMenuById", null);
MenuController = __decorate([
    swagger.ApiTags('menu'),
    (0, common_1.Controller)('/api/menu'),
    (0, common_1.UseGuards)(guards_role_guard_1.RolesGuard),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [menu_services_1.MenuService])
], MenuController);
exports.MenuController = MenuController;
//# sourceMappingURL=menu.controllers.js.map