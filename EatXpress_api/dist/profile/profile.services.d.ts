import { IDataServices } from "src/core/abstracts/data_services.abstract";
import * as dtos from "src/core/dtos/fs.dtos";
import { EventEmitter2 } from "@nestjs/event-emitter";
export declare class ProfileService {
    private dataService;
    private evenEmitter;
    constructor(dataService: IDataServices, evenEmitter: EventEmitter2);
    saveAddress(address: dtos.createAddressDto, id: string, prioritize: boolean): Promise<{
        success: boolean;
        message: string;
        data: {
            user: import("../core/entities/fs.entities").User;
            newUseraddressList: import("../core/entities/fs.entities").Address[];
        };
    }>;
    getProfile(Id: string): Promise<{
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
    changePassword(Id: string, oldPassword: string, newPassword: string): Promise<{
        success: boolean;
        message: string;
    }>;
    saveVendorBankDetails(bankDetailsDto: dtos.CreateSubAccountType, vendorId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    updateSubaccountCode(data: {
        subaccountCode: string;
        vendorId: string;
    }): Promise<void>;
}
