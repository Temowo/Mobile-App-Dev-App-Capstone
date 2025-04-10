import { Injectable, NestMiddleware, UnauthorizedException, ForbiddenException, NotAcceptableException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import  * as crypto from 'crypto';


@Injectable()
export class PaymentMiddleware implements NestMiddleware {
    secret:string;
    ipWhiteList: string[];
    constructor(private readonly configService:ConfigService) {
        this.secret = this.configService.getOrThrow('paystackSecret');
        this.ipWhiteList = ["52.31.139.75", "52.49.173.169", "52.214.14.220"];
    }

    async use(req:Request, res:Response, next:NextFunction) {
        const hash = crypto.createHmac('sha512', this.secret).update(JSON.stringify(req.body)).digest('hex');
        const isWhiteListed:boolean = this.ipWhiteList.includes(req.ip);

        if ((hash == req.headers['x-paystack-signature']) && isWhiteListed ) {
            next();
        }else{
            throw new NotAcceptableException('invalid event authority');
        }        
    }
}