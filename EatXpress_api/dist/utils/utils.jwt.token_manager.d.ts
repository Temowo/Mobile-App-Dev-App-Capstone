import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class TokenManager {
    private configService;
    private jwtService;
    constructor(configService: ConfigService, jwtService: JwtService);
    signToken(payload: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signPasswordToken(payload: any): Promise<string>;
    signRefreshedToken(payload: any): Promise<string>;
    verifyToken(token: string): Promise<any>;
}
