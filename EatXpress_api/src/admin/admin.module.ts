import { Module } from '@nestjs/common';
import { DataAccessModule } from 'src/data_access/data_access.module';
import { GuardsModule } from 'src/guards/guards.module';
import { AdminController } from './admin.controllers';
import { AdminServices } from './admin.services';

@Module({
    imports: [DataAccessModule, GuardsModule],
    controllers: [AdminController],
    providers: [AdminServices],
    exports: [],
})
export class AdminModule {}
