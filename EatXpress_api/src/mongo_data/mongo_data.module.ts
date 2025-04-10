import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IDataServices } from 'src/core/abstracts/data_services.abstract';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import * as fsModels from './models/models';
import { MongoDataService } from './mongo_data.services';


@Module({
    imports: [
        ConfigModule,
        MongooseModule.forFeature([
            {name:fsModels.Transaction.name, schema: fsModels.TransactionSchema },
            {name:fsModels.Dispatch.name, schema: fsModels.DispatchSchema },
            {name:fsModels.Order.name, schema: fsModels.OrderSchema },
            {name:fsModels.Menu.name, schema: fsModels.MenuSchema },
            {name:fsModels.User.name, schema: fsModels.UserSchema },
            {name:fsModels.Address.name, schema: fsModels.AddressSchema },

        ]),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async(configService:ConfigService) => ({
                uri: configService.get<string>('dbUri'),                
            }),
            inject: [ConfigService],
            
        })
    ],
    providers: [
        {
            provide: IDataServices,
            useClass: MongoDataService,
        }
    ],
    exports: [IDataServices],
})
export class MongoDataModule {}
