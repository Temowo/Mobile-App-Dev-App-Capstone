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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const cache_manager_1 = require("@nestjs/cache-manager");
const utils_string_generator_1 = require("./utils/utils.string_generator");
let AppService = class AppService {
    constructor(ev, cacheManager, stringGenerator) {
        this.ev = ev;
        this.cacheManager = cacheManager;
        this.stringGenerator = stringGenerator;
    }
    async getHello() {
        let verificationCode = this.stringGenerator.generateRandomString(6);
        await this.cacheManager.set(`verify_${verificationCode}`, 'world');
        console.log('sample code: ', verificationCode);
        return `welcome to food swipe : ${verificationCode}`;
    }
    async getCached(code) {
        let cachedData = await this.cacheManager.get(`verify_${code}`);
        return `welcome to food swipe: ${cachedData}`;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2, Object, utils_string_generator_1.StringGenerator])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map