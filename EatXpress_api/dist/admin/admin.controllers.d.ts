import { AdminServices } from './admin.services';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminServices);
    getVendors(): Promise<{
        success: boolean;
        message: string;
        data: import("../core/entities/fs.entities").User[];
    }>;
    getVendor(vendorId: string): Promise<{
        success: boolean;
        message: string;
        data: import("../core/entities/fs.entities").User;
    }>;
    getUsers(): Promise<{
        success: boolean;
        message: string;
        data: import("../core/entities/fs.entities").User[];
    }>;
    getUser(userId: string): Promise<{
        success: boolean;
        message: string;
        data: import("../core/entities/fs.entities").User;
    }>;
    getRiders(): Promise<{
        success: boolean;
        message: string;
        data: import("../core/entities/fs.entities").User[];
    }>;
    getRider(riderId: string): Promise<{
        success: boolean;
        message: string;
        data: import("../core/entities/fs.entities").User;
    }>;
}
