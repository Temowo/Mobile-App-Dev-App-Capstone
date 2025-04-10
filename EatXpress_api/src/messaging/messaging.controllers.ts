import { Injectable, Controller, UseGuards, Body, Post, Get, Req } from "@nestjs/common";
import { MessagingEventService } from "./messaging.service";
import * as dtos from 'src/core/dtos/fs.dtos';
import * as swagger from '@nestjs/swagger';
import { Request } from "express";
import { RolesGuard } from "src/guards/guards.role_guard";
import { Roles } from "src/guards/guards.roles";

@Injectable()
@swagger.ApiTags('messaging')
@Controller('api/messaging')
@UseGuards(RolesGuard)
export class MessageController {

    constructor(private messageHandler: MessagingEventService){}

    @Post('/push-token')
    @Roles(dtos.Roles.USER, dtos.Roles.VENDOR, dtos.Roles.RIDER)
    async savePushToken(
        @Body()pushToken: {token:string},
        @Req()req : Request
    ){
        return this.messageHandler.savePushToken(pushToken.token, req.user.id);
    }
}