/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { IDataServices } from "src/core/abstracts/data_services.abstract";
import * as dtos from 'src/core/dtos/fs.dtos';
import { Cache } from 'cache-manager';
import { StringGenerator } from 'src/utils/utils.string_generator';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class DispatchService {
    private dataService;
    private stringGenerator;
    private cacheManager;
    private eventEmitter;
    constructor(dataService: IDataServices, stringGenerator: StringGenerator, cacheManager: Cache, eventEmitter: EventEmitter2);
    createDispatch(payload: dtos.dispatchEventPayload): Promise<void>;
    notifyRiders(orderId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            dispatchreference: string;
        };
    }>;
    acceptDispatch(dispatchId: string, riderId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            dispatchReference: string;
        };
    }>;
    completeDispatch(dispatchId: string): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            reference: import("mongoose").Schema.Types.ObjectId;
        };
    }>;
    getDispatch(dispatchId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            dispatch: import("../core/entities/fs.entities").Dispatch;
        };
    }>;
    getRiderDispatch(riderId: string, page?: number): Promise<{
        success: boolean;
        message: string;
        data: {
            dispatchs: import("../core/entities/fs.entities").Dispatch[];
            nextPage: boolean;
        };
    }>;
    updateRiderLocation(riderId: string, geos: {
        lat: number;
        lng: number;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    trackDispatchRider(dispatchId: string): Promise<{
        success: boolean;
        message: string;
        data: unknown;
    }>;
}
