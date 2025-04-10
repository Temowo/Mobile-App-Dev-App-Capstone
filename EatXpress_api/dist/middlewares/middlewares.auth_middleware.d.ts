import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenManager } from 'src/utils/utils.jwt.token_manager';
import { TokenExtractor } from 'src/utils/utils.token_extractor';
export declare class AuthMiddleware implements NestMiddleware {
    private extractor;
    private tokenManager;
    constructor(extractor: TokenExtractor, tokenManager: TokenManager);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
