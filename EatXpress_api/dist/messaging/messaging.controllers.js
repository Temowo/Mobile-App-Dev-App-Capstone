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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const messaging_service_1 = require("./messaging.service");
const dtos = require("../core/dtos/fs.dtos");
const swagger = require("@nestjs/swagger");
const guards_role_guard_1 = require("../guards/guards.role_guard");
const guards_roles_1 = require("../guards/guards.roles");
let MessageController = class MessageController {
    constructor(messageHandler) {
        this.messageHandler = messageHandler;
    }
    async savePushToken(pushToken, req) {
        return this.messageHandler.savePushToken(pushToken.token, req.user.id);
    }
};
__decorate([
    (0, common_1.Post)('/push-token'),
    (0, guards_roles_1.Roles)(dtos.Roles.USER, dtos.Roles.VENDOR, dtos.Roles.RIDER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "savePushToken", null);
MessageController = __decorate([
    (0, common_1.Injectable)(),
    swagger.ApiTags('messaging'),
    (0, common_1.Controller)('api/messaging'),
    (0, common_1.UseGuards)(guards_role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [messaging_service_1.MessagingEventService])
], MessageController);
exports.MessageController = MessageController;
//# sourceMappingURL=messaging.controllers.js.map