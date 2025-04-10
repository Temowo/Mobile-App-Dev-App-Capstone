import { ConfigService } from "@nestjs/config";
export declare class PushService {
    private readonly configService;
    app: any;
    constructor(configService: ConfigService);
    sendPushNotification(token: string, title: string, body: string, payload?: any): Promise<boolean>;
    broadcastNotification(tokens: string[], title: string, body: string, payload?: any): Promise<boolean>;
}
