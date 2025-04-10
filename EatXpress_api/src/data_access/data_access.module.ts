import { Module } from '@nestjs/common';
import { MongoDataModule } from 'src/mongo_data/mongo_data.module';

@Module({
    imports: [MongoDataModule],
    exports: [MongoDataModule],
})
export class DataAccessModule {}
