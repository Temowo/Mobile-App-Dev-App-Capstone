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
exports.MessagingEventService = void 0;
const common_1 = require("@nestjs/common");
const messaging_email_service_1 = require("./messaging.email_service");
const dtos = require("../core/dtos/fs.dtos");
const data_services_abstract_1 = require("../core/abstracts/data_services.abstract");
const messaging_push_service_1 = require("./messaging.push_service");
const event_emitter_1 = require("@nestjs/event-emitter");
const messaging_sms_service_1 = require("./messaging.sms_service");
let MessagingEventService = class MessagingEventService {
    constructor(dataService, mailSender, pushService, textService) {
        this.dataService = dataService;
        this.mailSender = mailSender;
        this.pushService = pushService;
        this.textService = textService;
    }
    welcomeVendor(data) {
        this.mailSender.sendWelcomeMail(data);
    }
    async testSms(name) {
        console.log('sending test sms...');
        await this.textService.sendTest(`Hi ${name} Termii integration pass`, '2348136460333');
    }
    recoverPassword(data) {
        this.mailSender.sendPasswordRecoveryMail(data);
    }
    vendorOrderAlert(name, phone, menu) {
        const text = `Hi ${name} a new order for ${menu} has been placed. visit your dashboard to accept or decline the order.`;
        this.textService.sendNewVendorOrderAlert(text, phone);
    }
    async savePushToken(token, userId) {
        let user = await this.dataService.users.getById(userId);
        if (!user)
            throw new common_1.NotFoundException('account does not exist');
        user.pushToken = token;
        await this.dataService.users.update(user._id.toString(), user);
        return {
            success: true,
            messsage: 'push message token saved'
        };
    }
    async sendRiderLocation(userId, geos) {
        let user = await this.dataService.users.getById(userId);
        if (!user)
            throw new common_1.NotFoundException('account does not exist');
    }
    async notifyRiders(payload) {
        let riders = await this.dataService.users.getByField('role', 'RIDER');
        const tokens = [];
        riders.map((rider) => {
            tokens.push(rider.pushToken);
        });
        await this.pushService.broadcastNotification(tokens, 'new Dispatch', payload.text, payload.acceptUrl);
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('userCreated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MessagingEventService.prototype, "welcomeVendor", null);
__decorate([
    (0, event_emitter_1.OnEvent)('sendTest', { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessagingEventService.prototype, "testSms", null);
__decorate([
    (0, event_emitter_1.OnEvent)('recoverPass'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MessagingEventService.prototype, "recoverPassword", null);
__decorate([
    (0, event_emitter_1.OnEvent)('newOrder'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], MessagingEventService.prototype, "vendorOrderAlert", null);
__decorate([
    (0, event_emitter_1.OnEvent)('newDispatch'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagingEventService.prototype, "notifyRiders", null);
MessagingEventService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [data_services_abstract_1.IDataServices,
        messaging_email_service_1.MailSender,
        messaging_push_service_1.PushService,
        messaging_sms_service_1.SmsService])
], MessagingEventService);
exports.MessagingEventService = MessagingEventService;
//# sourceMappingURL=messaging.service.js.map