import { PaymentService } from "./payments.services";
import { Response } from 'express';
import * as dtos from "src/core/dtos/fs.dtos";
export declare class PaymentController {
    private paymentService;
    constructor(paymentService: PaymentService);
    createCheckout(checkoutDto: dtos.CreateCheckout): Promise<{
        success: boolean;
        message: string;
        data: {
            checkout_url: string;
        };
    }>;
    handleWebhook(data: dtos.webhookEvent, res: Response): Promise<void>;
}
