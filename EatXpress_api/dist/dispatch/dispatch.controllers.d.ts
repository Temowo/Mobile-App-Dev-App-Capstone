import { DispatchService } from './dispatch.services';
import { Request } from 'express';
export declare class DispatchController {
    private dispatchService;
    constructor(dispatchService: DispatchService);
    acceptDispatch(dispatchId: string, req: Request): Promise<{
        success: boolean;
        message: string;
        data: {
            dispatchReference: string;
        };
    }>;
    completeDispatch(dispatchId: string): Promise<void>;
    getDispatch(dispatchId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            dispatch: import("../core/entities/fs.entities").Dispatch;
        };
    }>;
    getRiderDispatch(req: Request): Promise<{
        success: boolean;
        message: string;
        data: {
            dispatchs: import("../core/entities/fs.entities").Dispatch[];
            nextPage: boolean;
        };
    }>;
    updateRiderLocation(geos: {
        lat: number;
        lng: number;
    }, req: Request): Promise<{
        success: boolean;
        message: string;
    }>;
    trackDispatch(dispatchId: string): Promise<{
        success: boolean;
        message: string;
        data: unknown;
    }>;
}
