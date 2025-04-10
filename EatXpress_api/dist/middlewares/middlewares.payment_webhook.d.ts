import { NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
export declare class PaymentMiddleware implements NestMiddleware {
    private readonly configService;
    secret: string;
    ipWhiteList: string[];
    constructor(configService: ConfigService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
