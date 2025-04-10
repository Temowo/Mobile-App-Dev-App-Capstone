import { IDataServices } from "src/core/abstracts/data_services.abstract";
import { TokenManager } from "src/utils/utils.jwt.token_manager";
import { TokenExtractor } from "src/utils/utils.token_extractor";
import * as dtos from "src/core/dtos/fs.dtos";
import { Request } from "express";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { StringGenerator } from "src/utils/utils.string_generator";
import { Cache } from 'cache-manager';
export declare class AuthService {
    private dataService;
    private tokenManager;
    private extractor;
    private eventEmitter;
    private stringGenerator;
    private cacheManager;
    constructor(dataService: IDataServices, tokenManager: TokenManager, extractor: TokenExtractor, eventEmitter: EventEmitter2, stringGenerator: StringGenerator, cacheManager: Cache);
    addAdmin(admin: dtos.RegisterAdminType): Promise<dtos.ResponseDto>;
    registerVendor(persona: dtos.RegisterVendorType): Promise<dtos.ResponseDto>;
    registerPersona(persona: dtos.RegisterDto): Promise<dtos.ResponseDto>;
    resendVerifyToken(email: string): Promise<{
        success: boolean;
        message: string;
    }>;
    verifyEmail(data: dtos.VerifyEmailType): Promise<{
        success: boolean;
        message: string;
    }>;
    signIn(creds: dtos.LoginDto): Promise<dtos.ResponseDto>;
    refreshAccessToken(request: Request): Promise<string>;
    forgetPassword(recoveryDto: {
        email: string;
    }): Promise<dtos.ResponseDto>;
    resetPassword(password: string, token: string): Promise<dtos.ResponseDto>;
}
