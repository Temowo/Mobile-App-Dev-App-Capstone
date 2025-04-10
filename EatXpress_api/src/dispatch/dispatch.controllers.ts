import { Body, Controller, Get, Post, Req, Res, Param, UseGuards, Query, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, Injectable, Patch } from '@nestjs/common';
import { DispatchService } from './dispatch.services';
import  * as dtos from 'src/core/dtos/fs.dtos';
import { Request, Response } from 'express';
import * as swagger  from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/guards.role_guard';
import { Roles } from 'src/guards/guards.roles';


@swagger.ApiTags('dispatch')
@UseGuards(RolesGuard)
@Injectable()
@Controller('api/dispatch')
export class DispatchController {
    constructor(
        private dispatchService:DispatchService,
        
    ){}

    
    
    @Get('/accept/:dispatchId')
    @swagger.ApiBearerAuth()
    @swagger.ApiOkResponse({
        description: 'dispatch accepted by rider...',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    })
    @swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    })
    @Roles(dtos.Roles.RIDER, dtos.Roles.ADMIN)
    async acceptDispatch(
        @Param('dispatchId') dispatchId:string,
        @Req()req:Request
    ){
        return this.dispatchService.acceptDispatch(dispatchId, req.user.id);

    }
    
    @Get('complete/:dispatchId')
    @Roles(dtos.Roles.RIDER, dtos.Roles.ADMIN)
    async completeDispatch(
        @Param('dispatchId') dispatchId:string
    ){
        this.dispatchService.completeDispatch(dispatchId);
    }

    @Get('/:dispatchId')
    @swagger.ApiBearerAuth()
    @swagger.ApiOkResponse({
        description: 'dispatch retreived...',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    })
    @Roles(dtos.Roles.VENDOR, dtos.Roles.USER, dtos.Roles.RIDER, dtos.Roles.ADMIN)
    async getDispatch(
        @Param('dispatchId') dispatchId:string
    ){
        return this.dispatchService.getDispatch(dispatchId)
    }
    
    
    @Get('/rider')
    @swagger.ApiBearerAuth()
    @swagger.ApiOkResponse({
        description: 'rider dispatch retreived...',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    })
    @swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    })
    @Roles(dtos.Roles.RIDER, dtos.Roles.ADMIN)
    async getRiderDispatch(
        @Req()req:Request,
    ){
        return this.dispatchService.getRiderDispatch(req.user.id);
    }


    @Post('/locations')
    @swagger.ApiBearerAuth()
    @swagger.ApiOkResponse({
        description: 'rider location updated...',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    })
    @swagger.ApiBadRequestResponse({
        description: 'invalid request payload',
    })
    @Roles(dtos.Roles.RIDER, dtos.Roles.ADMIN)
    async updateRiderLocation(
        @Body()geos: {lat:number, lng:number},
        @Req()req:Request,
    ){
        await this.dispatchService.updateRiderLocation(req.user.id, geos);
        return {
            success: true,
            message: 'Location updated'
        }
    }

    @Get('/tracking/:dispatchId')
    @swagger.ApiBearerAuth()
    @swagger.ApiOkResponse({
        description: 'rider location retreived...',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    })
    @swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    })
    @Roles(dtos.Roles.RIDER, dtos.Roles.ADMIN)
    async trackDispatch(
        @Param('dispatchId')dispatchId:string,
    ){
        return this.dispatchService.trackDispatchRider(dispatchId);
    }

    
}