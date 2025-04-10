import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data_services.abstract";
import * as dtos from "src/core/dtos/fs.dtos";
import * as entities from "src/core/entities/fs.entities";
@Injectable()
export class AdminServices {
    constructor(
        private configService: ConfigService,
        private dataService: IDataServices,
    ){}

    async getVendors() {
        const vendors: entities.User[] = await this.dataService.users.getByField('role', "VENDOR");
        return {
            success: true,
            message: "vendor list retrieved",
            data: vendors
        }
    }

    async getVendor(vendorId:string) {
        const vendor: entities.User = await this.dataService.users.getById(vendorId);
        return {
            success: true,
            message: "vendor list retrieved",
            data: vendor
        }
    }


    async getUsers() {
        const users: entities.User[] = await this.dataService.users.getByField('role', "USER");
        return {
            success: true,
            message: "vendor list retrieved",
            data: users
        }
    }

    async getUser(userId:string) {
        const user: entities.User = await this.dataService.users.getById(userId);
        return {
            success: true,
            message: "vendor list retrieved",
            data: user
        }
    }

    async getRiders() {
        const riders: entities.User[] = await this.dataService.users.getByField('role', "RIDER");
        return {
            success: true,
            message: "vendor list retrieved",
            data: riders
        }
    }

    async getRider(riderId:string) {
        const rider: entities.User = await this.dataService.users.getById(riderId);
        return {
            success: true,
            message: "vendor list retrieved",
            data: rider
        }
    }
}