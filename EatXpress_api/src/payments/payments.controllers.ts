import { Injectable, Controller, Post, Get, Body, Param, Req, Res } from "@nestjs/common";
import { PaymentService } from "./payments.services";
import { Request, Response } from 'express';
import * as swagger from "@nestjs/swagger";
import { RolesGuard } from 'src/guards/guards.role_guard';
import { Roles } from 'src/guards/guards.roles';
import * as dtos from "src/core/dtos/fs.dtos";

@Injectable()
@swagger.ApiTags('auth')
@Controller('api/payments')
export class PaymentController {

    constructor(private paymentService:PaymentService){}


    //create checkout
    @Post('/checkout')
    @swagger.ApiBearerAuth()
    @swagger.ApiCreatedResponse({
        description: 'checkout created',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    })
    @swagger.ApiBadRequestResponse({
        description: 'invalid request payload',
    })
    @swagger.ApiBody({ type: dtos.CreateCheckoutDto })
    @Roles(dtos.Roles.ADMIN, dtos.Roles.USER)
    createCheckout(
        @Body() checkoutDto:dtos.CreateCheckout,
    ){
        return this.paymentService.createCheckout(checkoutDto);
    }

    

    @Post('/webhook')
    async handleWebhook(
        @Body()data:dtos.webhookEvent,
        @Res({ passthrough:true })res:Response
    ){
        res.sendStatus(200).end();
        this.paymentService.handleWebhook(data);
    }
}

/**
 * // admin register vendor
    @Get('/verify/:reference')
    @swagger.ApiBearerAuth()
    @swagger.ApiCreatedResponse({
        description: 'verify checkout payment',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    })
    @swagger.ApiBadRequestResponse({
        description: 'invalid request payload',
    })
    @Roles(dtos.Roles.ADMIN, dtos.Roles.RIDER)
    verifyTransaction(
        @Param('reference') reference: string ,
    ){
        return this.paymentService.verifyTransaction(reference);
    }

    
    //get transactions
    @Get('/transactions')
    @swagger.ApiBearerAuth()
    @swagger.ApiCreatedResponse({
        description: 'get user transactions payment',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    })
    @Roles(dtos.Roles.ADMIN, dtos.Roles.USER)
    getTransactions(
        @Req()req:Request
    ){
        return this.paymentService.getTransactions(req.user.id)
    }

    //initiate withdrawal
    @Post('withdraw')
    @swagger.ApiBearerAuth()
    @swagger.ApiCreatedResponse({
        description: 'initiate withdraw process',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    })
    @swagger.ApiBadRequestResponse({
        description: 'invalid request payload',
    })
    @swagger.ApiBody({ type: dtos.WithdrawDto })
    @Roles(dtos.Roles.ADMIN, dtos.Roles.VENDOR)
    initiateWithdrawal(
        @Body()withdrawDto: dtos.WithdrawDtoType
    ){
        return this.paymentService.startWithdrawal(withdrawDto)
    }

    //confirm withdrawl
    @Post('/confirm-withdraw')
    @swagger.ApiBearerAuth()
    @swagger.ApiCreatedResponse({
        description: 'confirm withdraw otp',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    })
    @swagger.ApiBadRequestResponse({
        description: 'invalid request payload',
    })
    @swagger.ApiBody({ type: dtos.ConfirmWithdrawDto })
    @Roles(dtos.Roles.ADMIN, dtos.Roles.VENDOR)
    confirmWithdraw(
        @Body()withdrawOtp: dtos.ConfirmWithdrawDtoType
    ){
        return this.paymentService.confirmWithdrawal(withdrawOtp.otp)
    }
 */