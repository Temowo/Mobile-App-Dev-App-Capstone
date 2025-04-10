/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
export declare class CloudinaryManager {
    private configService;
    cloudName: string;
    cloudKey: string;
    cloudSecret: string;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File): Promise<string>;
    getFile(fileKey: string): Promise<void>;
    deleteFile(fileKey: string): Promise<void>;
}
