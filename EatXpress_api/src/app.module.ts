import { MiddlewareConsumer, Module, NestModule, OnModuleInit, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoDataModule } from './mongo_data/mongo_data.module';
import configurations from './configs/configurations';
import { DataAccessModule } from './data_access/data_access.module';
import { AuthModule } from './auth/auth.module';
import { MessagingModule } from './messaging/messaging.module';
import { AdminModule } from './admin/admin.module';
import { MiddlewaresModule } from './middlewares/middlewares.module';
import { GuardsModule } from './guards/guards.module';
import { UtilsModule } from './utils/utils.module';
import { AuthMiddleware } from './middlewares/middlewares.auth_middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { MulterModule } from '@nestjs/platform-express';
import { DispatchModule } from './dispatch/dispatch.module';
import { PaymentsModule } from './payments/payments.module';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { EventEmitterModule } from '@nestjs/event-emitter';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations],
      isGlobal: true,
    }),
    MongoDataModule,
    DataAccessModule,
    MiddlewaresModule,
    GuardsModule,
    UtilsModule,
    AuthModule,
    AdminModule,
    ProfileModule,
    MenuModule,
    OrderModule,
    DispatchModule,
    PaymentsModule,
    MessagingModule,
    MulterModule.register({      
      dest: './uploads',     
    }),
    CacheModule.register({
      isGlobal:true,      
      ttl:840000
    }),
    EventEmitterModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule  implements  NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .forRoutes({path: 'api/auth/register/vendor', method:RequestMethod.POST })
        .apply(AuthMiddleware)
        .forRoutes('/api/profile')
        .apply(AuthMiddleware)
        .forRoutes('/api/menu')
        .apply(AuthMiddleware)
        .forRoutes('/api/orders')
        .apply(AuthMiddleware)
        .forRoutes('/api/dispatch')
        .apply(AuthMiddleware)
        .forRoutes('/api/payments')
  }
}
