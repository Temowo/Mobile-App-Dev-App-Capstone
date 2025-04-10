import { AuthService } from './auth.services';
import * as dtos from 'src/core/dtos/fs.dtos';
import { Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    registerVendor(persona: dtos.RegisterVendorType): Promise<dtos.ResponseDto>;
    addAdmin(persona: dtos.RegisterAdminType): Promise<dtos.ResponseDto>;
    registerPersona(persona: dtos.RegisterType): Promise<dtos.ResponseDto>;
    verifyEmail(verifyDto: dtos.VerifyEmailType): Promise<{
        success: boolean;
        message: string;
    }>;
    signIn(creds: dtos.LoginDtoType): Promise<dtos.ResponseDto>;
    refreshAccessToken(req: Request): Promise<string>;
    forgetPass(recoveryDto: {
        email: string;
    }): Promise<dtos.ResponseDto>;
    resetPass(resetDto: dtos.PasswordResetType): Promise<dtos.ResponseDto>;
}
