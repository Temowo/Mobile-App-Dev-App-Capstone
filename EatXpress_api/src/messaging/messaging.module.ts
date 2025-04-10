import { Module } from '@nestjs/common';
import { MailSender } from './messaging.email_service';
import { SmsService } from './messaging.sms_service';
import { MessagingEventService } from './messaging.service';
import { DataAccessModule } from 'src/data_access/data_access.module';
import { PushService } from './messaging.push_service';
import { MessageController } from './messaging.controllers';


@Module({
    imports: [DataAccessModule],
    controllers:[MessageController],
    providers:[MailSender, SmsService, PushService, MessagingEventService],
    exports:[],
})
export class MessagingModule {}
