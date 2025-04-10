import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

@Injectable()
export class SmsService{
    constructor(private configService: ConfigService){}

    async sendTest(message:string, phone:string){
        await this.sendSMS(message, phone);
    } 


    async sendNewVendorOrderAlert(text:string, phone:string){
        await this.sendSMS(text, phone);
    }

    async sendOrderCompleted(text:string, phone:string){
        await this.sendSMS(text, phone);
    }

    async sendDispatchAccepted(text:string, phone:string){
        await this.sendSMS(text, phone);
    }

    private async sendSMS(message: string, to:string){
        try {
            
            const headers = {
                "Content-Type": "application/json",
            };
            const data1 = {
                to: "2348136460333",
                from: "FoodSwipe",
                sms: "Termii integration test passed",
                type: "plain",
                channel:  "generic",
                api_key: ""
            };
            const smsUrl = `${this.configService.getOrThrow('smsUrl')}`;
            
            const data = {
                to: to.replace("+", ""),
                from: this.configService.get<string>('smsId'),
                sms: message,
                type: "plain",
                channel:  "generic",
                api_key: this.configService.get<string>('smsKey')
            };
    

            const response = await axios.post(smsUrl, JSON.stringify(data), { headers });
            console.log(response);
        } catch (error) {
            console.log('sms', error, error.code, error.message);
        }

    }
}