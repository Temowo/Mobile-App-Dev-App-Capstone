"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryManager = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cloudinary = require('cloudinary').v2;
let CloudinaryManager = class CloudinaryManager {
    constructor(configService) {
        this.configService = configService;
        this.cloudName = this.configService.get('cloudName');
        this.cloudKey = this.configService.get('cloudKey');
        this.cloudSecret = this.configService.get('cloudSecret');
    }
    async uploadFile(file) {
        cloudinary.config({
            cloud_name: this.cloudName,
            api_key: this.cloudKey,
            api_secret: this.cloudSecret
        });
        const res = await cloudinary.uploader.upload(file.path, { public_id: file.originalname });
        if (!res) {
            'upload error';
        }
        return res.secure_url;
    }
    async getFile(fileKey) {
    }
    async deleteFile(fileKey) {
    }
};
CloudinaryManager = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CloudinaryManager);
exports.CloudinaryManager = CloudinaryManager;
//# sourceMappingURL=menu.cloudinary_service.js.map