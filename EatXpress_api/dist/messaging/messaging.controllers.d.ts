import { MessagingEventService } from "./messaging.service";
import { Request } from "express";
export declare class MessageController {
    private messageHandler;
    constructor(messageHandler: MessagingEventService);
    savePushToken(pushToken: {
        token: string;
    }, req: Request): Promise<{
        success: boolean;
        messsage: string;
    }>;
}
