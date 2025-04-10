import { ProfileService } from './profile.services';
import * as dtos from 'src/core/dtos/fs.dtos';
import { Request } from 'express';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    createAddress(primary: boolean, address: dtos.createAddressDtoType, req: Request): Promise<{
        success: boolean;
        message: string;
        data: {
            user: import("../core/entities/fs.entities").User;
            newUseraddressList: import("../core/entities/fs.entities").Address[];
        };
    }>;
    getProfile(req: Request): Promise<{
        success: boolean;
        message: string;
        data: {
            user: import("../core/entities/fs.entities").User;
            address: import("../core/entities/fs.entities").Address[];
        };
    }>;
    getAll(): Promise<{
        success: boolean;
        message: string;
        data: import("../core/entities/fs.entities").Address[];
    }>;
    changePassword(changePassDto: dtos.ChangePasswordDto, req: Request): Promise<{
        success: boolean;
        message: string;
    }>;
    createCheckout(bankDetailsDto: dtos.CreateSubAccountType, req: Request): Promise<{
        success: boolean;
        message: string;
    }>;
}
