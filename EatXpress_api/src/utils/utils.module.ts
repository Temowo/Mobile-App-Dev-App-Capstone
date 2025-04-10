import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TokenManager } from './utils.jwt.token_manager';
import { TokenExtractor } from './utils.token_extractor';
import { StringGenerator } from './utils.string_generator';

@Module({
    imports:[
        ConfigModule,
        JwtModule.registerAsync({
            imports:[ConfigModule],
            useFactory: async(configService:ConfigService) => ({
                secret: configService.get<string>('jwtSecret'),
            }),
            inject:[ConfigService],
        }), 
    ],
    providers:[TokenManager, TokenExtractor, StringGenerator],
    exports: [TokenManager, TokenExtractor, StringGenerator],
})
export class UtilsModule {}
