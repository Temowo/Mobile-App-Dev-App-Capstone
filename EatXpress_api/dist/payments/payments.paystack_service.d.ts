import { ConfigService } from "@nestjs/config";
import * as dtos from 'src/core/dtos/fs.dtos';
import { IDataServices } from "src/core/abstracts/data_services.abstract";
import { StringGenerator } from "src/utils/utils.string_generator";
import { EventEmitter2 } from "@nestjs/event-emitter";
export declare class PayStackService {
    private readonly configService;
    private dataService;
    private stringGenerator;
    private eventEmitter;
    baseUrl: string;
    paystackSecret: string;
    paystackKey: string;
    constructor(configService: ConfigService, dataService: IDataServices, stringGenerator: StringGenerator, eventEmitter: EventEmitter2);
    createSubaccount(data: dtos.SubAccountType): Promise<void>;
    createCheckout(data: dtos.CreateCheckout): Promise<{
        success: boolean;
        message: string;
        data: {
            checkout_url: string;
        };
    }>;
    verifyTransaction(reference: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getTransactions(): Promise<void>;
    private sendRequest;
}
