/// <reference types="multer" />
import { MenuService } from './menu.services';
import * as dtos from 'src/core/dtos/fs.dtos';
import { Request } from 'express';
export declare class MenuController {
    private menuService;
    constructor(menuService: MenuService);
    createMenu(createMenuDto: dtos.CreateMenuDtoType, file: Express.Multer.File, req: Request): Promise<{
        success: boolean;
        message: string;
        data: {
            menuId: string;
        };
    }>;
    updateMenuPrice(menuId: string, priceDto: dtos.UpdateMenuPriceDtoType): Promise<{
        success: boolean;
        message: string;
    }>;
    getMenus(page: number): Promise<{
        success: boolean;
        message: string;
        data: {
            menus: import("../core/entities/fs.entities").Menu[];
            nextPage: boolean;
        };
    }>;
    getMenuByVendor(req: Request): Promise<{
        success: boolean;
        message: string;
        data: import("../core/entities/fs.entities").Menu[];
    }>;
    getMenuById(menuId: string): Promise<{
        success: boolean;
        message: string;
        data: import("../core/entities/fs.entities").Menu;
    }>;
}
