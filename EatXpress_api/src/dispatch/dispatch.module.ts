import { Module } from '@nestjs/common';
import { DataAccessModule } from 'src/data_access/data_access.module';
import { DispatchController } from './dispatch.controllers';
import { DispatchService } from './dispatch.services';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
    imports: [DataAccessModule, UtilsModule],
    controllers: [DispatchController],
    providers: [DispatchService],
    exports: [DispatchService]
})
export class DispatchModule {}
