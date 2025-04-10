import { ConfigService } from "@nestjs/config";
import * as dtos from "src/core/dtos/fs.dtos";
export declare class MailSender {
    private configService;
    clientId: string;
    mailingKey: string;
    mailingUser: string;
    constructor(configService: ConfigService);
    sendVendorWelcomeMail(data: dtos.WelcomeEvent): void;
    sendWelcomeMail(data: dtos.WelcomeEvent): void;
    sendPasswordRecoveryMail(data: {
        address: string;
        token: string;
    }): void;
    private sendMail;
}
