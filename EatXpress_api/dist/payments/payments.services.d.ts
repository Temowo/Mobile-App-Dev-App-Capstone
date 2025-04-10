import { ConfigService } from "@nestjs/config";
import { IDataServices } from "src/core/abstracts/data_services.abstract";
import { PayStackService } from "./payments.paystack_service";
import * as dtos from "src/core/dtos/fs.dtos";
import { EventEmitter2 } from "@nestjs/event-emitter";
export declare class PaymentService {
    private dataService;
    private configService;
    private paystackService;
    private eventEmitter;
    ipWhiteList: string[];
    constructor(dataService: IDataServices, configService: ConfigService, paystackService: PayStackService, eventEmitter: EventEmitter2);
    verifyTransaction(reference: string): Promise<{
        success: boolean;
        message: string;
    }>;
    createCheckout(checkoutDto: dtos.CreateCheckout): Promise<{
        success: boolean;
        message: string;
        data: {
            checkout_url: string;
        };
    }>;
    handleWebhook(data: dtos.webhookEvent): Promise<void>;
    getTransactions(userId: string): Promise<void>;
    startWithdrawal(withdrawDto: dtos.WithdrawDtoType): Promise<void>;
    confirmWithdrawal(otp: string): Promise<void>;
}
