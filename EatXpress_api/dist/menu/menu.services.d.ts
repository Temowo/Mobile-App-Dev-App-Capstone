/// <reference types="multer" />
import { IDataServices } from "src/core/abstracts/data_services.abstract";
import * as dtos from "src/core/dtos/fs.dtos";
import { CloudinaryManager } from "./menu.cloudinary_service";
export declare class MenuService {
    private dataService;
    private cloudManager;
    constructor(dataService: IDataServices, cloudManager: CloudinaryManager);
    createMenu(createMenuDto: dtos.CreateMenuDto, file: Express.Multer.File, id: string): Promise<{
        success: boolean;
        message: string;
        data: {
            menuId: string;
        };
    }>;
    updateMenuPrice(price: number, menuId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getMenus(page?: number): Promise<{
        success: boolean;
        message: string;
        data: {
            menus: import("../core/entities/fs.entities").Menu[];
            nextPage: boolean;
        };
    }>;
    getVendorMenus(vendorId: string): Promise<{
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
