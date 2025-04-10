import { MailSender } from "./messaging.email_service";
import * as dtos from '../core/dtos/fs.dtos';
import { IDataServices } from "src/core/abstracts/data_services.abstract";
import { PushService } from "./messaging.push_service";
import { SmsService } from "./messaging.sms_service";
export declare class MessagingEventService {
    private dataService;
    private mailSender;
    private pushService;
    private textService;
    constructor(dataService: IDataServices, mailSender: MailSender, pushService: PushService, textService: SmsService);
    welcomeVendor(data: dtos.WelcomeEvent): void;
    testSms(name: string): Promise<void>;
    recoverPassword(data: {
        address: string;
        token: string;
    }): void;
    vendorOrderAlert(name: string, phone: string, menu: string): void;
    savePushToken(token: string, userId: string): Promise<{
        success: boolean;
        messsage: string;
    }>;
    sendRiderLocation(userId: string, geos: {
        lat: number;
        lng: number;
    }): Promise<void>;
    notifyRiders(payload: {
        text: string;
        acceptUrl: string | URL;
    }): Promise<void>;
}
