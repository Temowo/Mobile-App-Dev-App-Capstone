import { Injectable, NestMiddleware, UnauthorizedException, ForbiddenException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express';
import { TokenManager } from 'src/utils/utils.jwt.token_manager';
import { TokenExtractor } from 'src/utils/utils.token_extractor';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
      private extractor:TokenExtractor,
      private tokenManager: TokenManager
    ) {}

    async use(req:Request, res:Response, next:NextFunction) {
        const token = this.extractor.extractTokenFromHeader(req);
        if (!token) {
            throw new ForbiddenException();
        }  
        const payload = await this.tokenManager.verifyToken(token);
        
        // set the request user property
        let requestUser = {
          id:payload.sub,
          role: payload.role
        }
        req['user'] = requestUser;
        
        next();
        
    }
}