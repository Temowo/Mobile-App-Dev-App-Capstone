import { Body, Controller, Get, Post, Req, Res, Param, UseGuards, Query, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, Injectable, Patch } from '@nestjs/common';
import { OrderService } from './order.services';
import  * as dtos from 'src/core/dtos/fs.dtos';
import { Request, Response } from 'express';
import * as swagger  from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/guards.role_guard';
import { Roles } from 'src/guards/guards.roles';

@swagger.ApiTags('order')
@Controller('/api/orders')
@UseGuards(RolesGuard)
@Injectable()
export class OrderController {
    constructor(private orderService:OrderService){}

    @Post('')
    @swagger.ApiBearerAuth()
    @swagger.ApiCreatedResponse({
        description: 'Order created...',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    })
    @swagger.ApiBadRequestResponse({
        description: 'invalid request payload',
        
    })
    @swagger.ApiBody({ type: dtos.CreateOrderDto })
    @Roles(dtos.Roles.USER)
    createOrder(
        @Body() createOrderDto: dtos.CreateOrderDtoType,
        @Req()req:Request
    ){
        
        return this.orderService.createOrder(createOrderDto, req.user.id);
    }

    //get vendor order with pagination
    @Get('/vendors/:page')
    @swagger.ApiBearerAuth()
    @swagger.ApiOkResponse({
        description: 'vendor orders list retrieved...',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    })
    @swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    })   
    @Roles(dtos.Roles.VENDOR)
    getVendorOrders(
        @Param('page') page: number = 1,
        @Req()req:Request,
    ){
        return this.orderService.getVendorOrders(req.user.id, page);
    }


    //get user order with pagination
    @Get('/users/:page')
    @swagger.ApiBearerAuth()
    @swagger.ApiOkResponse({
        description: 'vendor orders list retrieved...',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    })
    @swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    }) 
    @Roles(dtos.Roles.USER)
    getUserOrders(
        @Param('page') page: number,
        @Req()req:Request
    ){
        return this.orderService.getUserOrders(req.user.id, page);
    }


    //get menus with pagination
    @Get('/riders')
    @swagger.ApiBearerAuth()
    @swagger.ApiOkResponse({
        description: 'rider orders list retrieved...',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    })
    @swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    })
    @Roles(dtos.Roles.RIDER,)
    getRiderOrders(
        @Req()req:Request
    ){
        return this.orderService.getRiderOrders(req.user.id);
    }

    //get order by id
    @Get('/:orderId')
    @swagger.ApiBearerAuth()
    @swagger.ApiOkResponse({
        description: 'order retrieved...',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    })
    @swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    })
    @Roles(dtos.Roles.VENDOR, dtos.Roles.USER, dtos.Roles.RIDER, dtos.Roles.ADMIN)
    getOrderById(
        @Param('orderId')orderId:string
    ){
        return this.orderService.getById(orderId);
    }

    //accept order
    @Get('/accept-order/:orderId')
    @swagger.ApiBearerAuth()
    @swagger.ApiOkResponse({
        description: 'order accepted...',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    })
    @swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    })
    @Roles(dtos.Roles.VENDOR)
    acceptOrder(
        @Param('orderId')orderId:string
    ){
        return this.orderService.acceptOrder(orderId);
    }
    

    //cancel order
    @Get('/cancel-order/:orderId')
    @swagger.ApiBearerAuth()
    @swagger.ApiOkResponse({
        description: 'order cancelled...',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    })
    @swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    })
    @Roles(dtos.Roles.VENDOR)
    cancelOrder(
        @Param('orderId')orderId:string
    ){
        return this.orderService.cancelOrder(orderId);
    }


    //complete order
    @Get('/complete-order/:orderId')
    @swagger.ApiBearerAuth()
    @swagger.ApiOkResponse({
        description: 'order completed...',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    })
    @swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    })
    @Roles(dtos.Roles.VENDOR)
    completeOrder(
        @Param('orderId')orderId:string
    ){
        return this.orderService.completeOrder(orderId);
    }


}