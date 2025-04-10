import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataAccessModule } from 'src/data_access/data_access.module';
import { MessagingModule } from 'src/messaging/messaging.module';
import { OrderController } from './order.controllers';
import { OrderService } from './order.services';
import { DispatchModule } from 'src/dispatch/dispatch.module';

@Module({
    imports: [
        DataAccessModule,
        ConfigModule,
        MessagingModule,
        DispatchModule
    ],
    controllers: [OrderController],
    providers:[OrderService],
})
export class OrderModule {}
