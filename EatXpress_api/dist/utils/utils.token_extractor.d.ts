import { Request } from 'express';
export declare class TokenExtractor {
    extractTokenFromHeader(request: Request): string | undefined;
}
