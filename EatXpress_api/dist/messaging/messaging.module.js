"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingModule = void 0;
const common_1 = require("@nestjs/common");
const messaging_email_service_1 = require("./messaging.email_service");
const messaging_sms_service_1 = require("./messaging.sms_service");
const messaging_service_1 = require("./messaging.service");
const data_access_module_1 = require("../data_access/data_access.module");
const messaging_push_service_1 = require("./messaging.push_service");
const messaging_controllers_1 = require("./messaging.controllers");
let MessagingModule = class MessagingModule {
};
MessagingModule = __decorate([
    (0, common_1.Module)({
        imports: [data_access_module_1.DataAccessModule],
        controllers: [messaging_controllers_1.MessageController],
        providers: [messaging_email_service_1.MailSender, messaging_sms_service_1.SmsService, messaging_push_service_1.PushService, messaging_service_1.MessagingEventService],
        exports: [],
    })
], MessagingModule);
exports.MessagingModule = MessagingModule;
//# sourceMappingURL=messaging.module.js.map