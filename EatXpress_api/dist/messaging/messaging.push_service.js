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
exports.PushService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_1 = require("firebase-admin/app");
let PushService = class PushService {
    constructor(configService) {
        this.configService = configService;
        this.app = (0, app_1.initializeApp)(new Object({
            apiKey: this.configService.getOrThrow('firebaseConfig.apiKey'),
            authDomain: this.configService.getOrThrow('firebaseConfig.authDomain'),
            projectId: this.configService.getOrThrow('firebaseConfig.projectId'),
            storageBucket: this.configService.getOrThrow('firebaseConfig.storageBucket'),
            messagingSenderId: this.configService.getOrThrow('firebaseConfig.messagingSenderId'),
            appId: this.configService.getOrThrow('firebaseConfig.appId'),
            measurementId: this.configService.getOrThrow('firebaseConfig.measurementId')
        }));
    }
    async sendPushNotification(token, title, body, payload) {
        const message = {
            token,
            notification: {
                title,
                body,
            },
            data: payload
        };
        try {
            await this.app.messaging().send(message);
            return true;
        }
        catch (error) {
            console.log(error.message);
            return false;
        }
    }
    async broadcastNotification(tokens, title, body, payload) {
        const message = {
            tokens,
            notification: {
                title,
                body,
            },
            data: payload
        };
        try {
            await this.app.messaging().sendEachForMulticast(message);
            return true;
        }
        catch (error) {
            console.log(error.message);
            return false;
        }
    }
};
PushService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PushService);
exports.PushService = PushService;
//# sourceMappingURL=messaging.push_service.js.map