//event handlers
import { Injectable, NotFoundException } from "@nestjs/common";
import { MailSender }  from "./messaging.email_service";
import * as dtos from '../core/dtos/fs.dtos'
import { IDataServices } from "src/core/abstracts/data_services.abstract";
import { PushService } from "./messaging.push_service";
import { User } from 'src/core/entities/fs.entities' 
import { OnEvent } from '@nestjs/event-emitter';
import { SmsService } from "./messaging.sms_service";

@Injectable()
export class MessagingEventService {
    constructor(
        private dataService:IDataServices,
        private mailSender: MailSender,
        private pushService:PushService,
        private textService: SmsService,
    ){}

    @OnEvent('userCreated')
    welcomeVendor(data: dtos.WelcomeEvent){
        //read the template
        this.mailSender.sendWelcomeMail(data);
        
    }

    @OnEvent('sendTest', {async : true})
    async  testSms(name:string){
        console.log('sending test sms...');
        await this.textService.sendTest(`Hi ${name} Termii integration pass`, '2348136460333');
    }

    

    @OnEvent('recoverPass')
    recoverPassword(data: { address:string, token: string}){
        //send the email
        this.mailSender.sendPasswordRecoveryMail(data);
    }

    @OnEvent('newOrder')
    vendorOrderAlert(name:string, phone:string, menu:string){
        const text =`Hi ${name} a new order for ${menu} has been placed. visit your dashboard to accept or decline the order.`
        this.textService.sendNewVendorOrderAlert(text, phone);
    }

    // @OnEvent('newOrder')
    // OrderCompletedAlert(name:string, phone:string, menu:string){
    //     const text =`Hi ${name} your order for ${menu} has been completed by vendor. visit your dashboard to accept or decline the order.`
    //     this.textService.sendNewVendorOrderAlert(text, phone);
    // }

    // @OnEvent('newOrder')
    // dispatchAcceptedAlert(name:string, phone:string){
    //     const text =`Hi ${name} a new order for ${menu} has been placed. visit your dashboard to accept or decline the order.`
    //     this.textService.sendNewVendorOrderAlert(text, phone);
    // }

    async savePushToken(token: string, userId:string){
        let user = await this.dataService.users.getById(userId);
        if(!user) throw new NotFoundException('account does not exist')

        user.pushToken = token;
        await this.dataService.users.update(user._id.toString(), user);

        return {
            success: true,
            messsage: 'push message token saved'
        }
    }


    //push message handlers
    async sendRiderLocation(userId:string, geos:{lat:number, lng:number}){
        let user = await this.dataService.users.getById(userId);
        if(!user) throw new NotFoundException('account does not exist')

        // await this.pushService.sendPushNotification(
        //     user.pushToken,
        //     'rider location',
        //     'update rider marker in map',
        //     geos
        // );
    }

    @OnEvent('newDispatch')
    async notifyRiders(payload:{text:string, acceptUrl:string | URL}){
        let riders = await this.dataService.users.getByField('role', 'RIDER');
        const tokens: string[] = [];
        riders.map((rider:User)=>{
            tokens.push(rider.pushToken);
        })
        await this.pushService.broadcastNotification(
            tokens,
            'new Dispatch',
            payload.text,
            payload.acceptUrl

        )
    }

}