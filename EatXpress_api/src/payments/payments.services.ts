import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IDataServices } from "src/core/abstracts/data_services.abstract";
import { PayStackService } from "./payments.paystack_service";
import * as dtos from "src/core/dtos/fs.dtos";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class PaymentService {
    ipWhiteList: string[];

    constructor(
        private dataService:IDataServices,
        private configService:ConfigService,
        private paystackService:PayStackService,
        private eventEmitter: EventEmitter2
        ){
        this.ipWhiteList = ["52.31.139.75", "52.49.173.169", "52.214.14.220"];
    }

    async verifyTransaction(reference:string){
        return await this.paystackService.verifyTransaction(reference);

    }

    async createCheckout(checkoutDto:dtos.CreateCheckout){
        return await this.paystackService.createCheckout(checkoutDto);
    }

    async handleWebhook(data:dtos.webhookEvent){
        //verify the payload
        const isWhiteListed:boolean = this.ipWhiteList.includes(data.data.ip_address);
        
        if((data.event ==="charge.success") && isWhiteListed){
            this.eventEmitter.emit('set_order_paid', data.data.reference);
        }else{
            console.log(`ip_address mismatch for order with reference ${data.data.reference}`);
        }
    }
    
    async getTransactions(userId:string){
        //let userTransactions = 
    }

    async startWithdrawal(withdrawDto:dtos.WithdrawDtoType){}

    

    async confirmWithdrawal(otp:string){}
}