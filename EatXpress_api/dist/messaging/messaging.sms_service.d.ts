import { ConfigService } from "@nestjs/config";
export declare class SmsService {
    private configService;
    constructor(configService: ConfigService);
    sendTest(message: string, phone: string): Promise<void>;
    sendNewVendorOrderAlert(text: string, phone: string): Promise<void>;
    sendOrderCompleted(text: string, phone: string): Promise<void>;
    sendDispatchAccepted(text: string, phone: string): Promise<void>;
    private sendSMS;
}
