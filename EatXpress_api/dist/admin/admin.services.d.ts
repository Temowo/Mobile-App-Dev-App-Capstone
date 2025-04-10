import { ConfigService } from "@nestjs/config";
import { IDataServices } from "src/core/abstracts/data_services.abstract";
import * as entities from "src/core/entities/fs.entities";
export declare class AdminServices {
    private configService;
    private dataService;
    constructor(configService: ConfigService, dataService: IDataServices);
    getVendors(): Promise<{
        success: boolean;
        message: string;
        data: entities.User[];
    }>;
    getVendor(vendorId: string): Promise<{
        success: boolean;
        message: string;
        data: entities.User;
    }>;
    getUsers(): Promise<{
        success: boolean;
        message: string;
        data: entities.User[];
    }>;
    getUser(userId: string): Promise<{
        success: boolean;
        message: string;
        data: entities.User;
    }>;
    getRiders(): Promise<{
        success: boolean;
        message: string;
        data: entities.User[];
    }>;
    getRider(riderId: string): Promise<{
        success: boolean;
        message: string;
        data: entities.User;
    }>;
}
