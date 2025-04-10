import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenManager {
    constructor(
        private configService: ConfigService,
        private jwtService: JwtService
    ){}

    async signToken(payload:any){
        const accessToken = await this.jwtService.signAsync(payload, {expiresIn: '15m'});
        const refreshToken = await this.jwtService.signAsync(payload, {expiresIn: '7d'});
        return { accessToken, refreshToken };
    }

    async signPasswordToken(payload:any){
        return await this.jwtService.signAsync(payload, {expiresIn: '10m'});
    }

    async signRefreshedToken(payload:any){
        return await this.jwtService.signAsync(payload, {expiresIn: '15m'});
    }

    async verifyToken(token: string){
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                  secret: this.configService.get<string>('jwtSecret')
                }
            );
            return payload;
            
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}