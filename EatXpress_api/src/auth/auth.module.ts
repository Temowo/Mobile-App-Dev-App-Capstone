import { Module } from '@nestjs/common';
import { DataAccessModule } from 'src/data_access/data_access.module';
import { AuthController } from './auth.controllers';
import { AuthService } from './auth.services';
import { GuardsModule } from 'src/guards/guards.module';
import { UtilsModule } from 'src/utils/utils.module';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
    imports: [
        DataAccessModule,
        GuardsModule,
        UtilsModule,
        MessagingModule,
        
    ],
    controllers:[AuthController],
    providers: [AuthService],
    exports: [],
})
export class AuthModule {}
