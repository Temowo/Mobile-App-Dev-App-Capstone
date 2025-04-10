import { Module } from '@nestjs/common';
import { DataAccessModule } from 'src/data_access/data_access.module';
import { ProfileController } from './profile.controllers';
import { ProfileService } from './profile.services';

@Module({
    imports: [DataAccessModule],
    controllers:[ProfileController],
    providers:[ProfileService]
})
export class ProfileModule {}
