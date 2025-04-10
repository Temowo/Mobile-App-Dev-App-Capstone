import { IDataServices } from "src/core/abstracts/data_services.abstract";
import { Injectable, NotAcceptableException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import * as dtos from "src/core/dtos/fs.dtos";
import { ObjectId } from "mongodb";
import { CloudinaryManager } from "./menu.cloudinary_service";
import { promisify } from "util";
import * as fs from 'fs';


@Injectable()
export class MenuService {
    constructor(
        private dataService: IDataServices,
        private cloudManager: CloudinaryManager,
    ){}

    async createMenu(createMenuDto:dtos.CreateMenuDto, file:Express.Multer.File, id:string){
        const vendor = await this.dataService.users.getById(id);
        if(!vendor) throw new NotFoundException('Account with that id does not exist');
        
        const imageUrl = await this.cloudManager.uploadFile(file);   
        if(imageUrl === 'upload error') throw new UnprocessableEntityException('error uploading menu image');
        
        // Delete the uploaded file from the local directory
        const unlinkAsync = promisify(fs.unlink);
        await unlinkAsync(file.path);
        
        let newMenu = await this.dataService.menus.create({
            ...createMenuDto, 
            vendorId: vendor._id,
            restaurant: vendor.name,
            imagePath: imageUrl,
        });

        return {
            success:true,
            message:"new vendor menu created",
            data: {
                menuId: newMenu._id.toString()
            }
        }
        
    }

    async updateMenuPrice(price:number, menuId:string){
        let menu = await this.dataService.menus.getById(menuId);
        menu.price = price;
        await this.dataService.menus.update(menuId, menu);

        return {
            success:true,
            message:"price updated successfully"
        }
    }

    async getMenus(page:number = 1){
        let menus = await this.dataService.menus.getAll();
        // let menus = await this.dataService.menus.getWithPagination('default', 'default', page);
        
        return {
            success: true,
            message: "All menu records",
            data: {
                menus,
                // menus: menus.length > 1 ? menus.slice(0, -1) : menus,
                nextPage: menus.length === 11 ? true : false
            }
        }
    }

    
    async getVendorMenus(vendorId:string){
        let menus = await this.dataService.menus.getByField("menu_vendorId", new ObjectId(vendorId));
        return {
            success: true,
            message: menus.length > 0 ? "list of menus by vendor" : "no available menu by this vendor",
            data: menus
        }
    }


    async getMenuById(menuId:string){
        try {
            let menu = await this.dataService.menus.getById(menuId);
            return {
                success: true,
                message: menu._id ? "one record found" : "no record found",
                data: menu._id ? menu : null
            };
        } catch (error) {
            throw new NotAcceptableException(error.message)
        }
    }
}