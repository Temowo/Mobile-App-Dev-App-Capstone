import { Module } from '@nestjs/common';
import { DataAccessModule } from 'src/data_access/data_access.module';
import { ConfigModule } from '@nestjs/config';
import { MenuController } from './menu.controllers';
import { MenuService } from './menu.services';
import { CloudinaryManager } from './menu.cloudinary_service';

@Module({
    imports: [DataAccessModule, ConfigModule],
    controllers: [MenuController],
    providers: [MenuService, CloudinaryManager]
})
export class MenuModule {}
