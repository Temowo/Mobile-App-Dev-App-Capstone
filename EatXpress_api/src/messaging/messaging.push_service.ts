import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { initializeApp, cert } from 'firebase-admin/app';


@Injectable()
export class PushService {
    app:any
    constructor(private readonly configService: ConfigService){
        
        this.app = initializeApp(
            new Object({            
                apiKey: this.configService.getOrThrow('firebaseConfig.apiKey'),
                authDomain: this.configService.getOrThrow('firebaseConfig.authDomain'),                  
                projectId: this.configService.getOrThrow('firebaseConfig.projectId'),                  
                storageBucket: this.configService.getOrThrow('firebaseConfig.storageBucket'),
                messagingSenderId: this.configService.getOrThrow('firebaseConfig.messagingSenderId'),                  
                appId: this.configService.getOrThrow('firebaseConfig.appId'),
                measurementId: this.configService.getOrThrow('firebaseConfig.measurementId')                           
            })
        );        
    }


    async sendPushNotification(token:string, title:string, body:string, payload?:any){
        const message = {
            token,
            notification: {
                title,
                body,
            },
            data:payload
        };

        try {
            await this.app.messaging().send(message);
            return true;
        }catch (error){
            console.log(error.message);
            return false;
        }
    }

    async broadcastNotification(tokens:string[], title:string, body:string, payload?:any){
        const message = {
            tokens,
            notification: {
                title,
                body,
            },
            data: payload
        };

        try {
            await this.app.messaging().sendEachForMulticast(message);
            return true;
        }catch (error){
            console.log(error.message);
            return false;
        }
    }
}