import { Controller, Body, Get, Post, Res, Param, UseGuards } from '@nestjs/common';
import { AdminServices } from './admin.services';
import { RolesGuard } from 'src/guards/guards.role_guard';
import { Roles } from 'src/guards/guards.roles';
import * as swagger  from '@nestjs/swagger';
import * as dtos from 'src/core/dtos/fs.dtos'

@swagger.ApiTags('admin')
@Controller('/api/admin')
// @UseGuards(RolesGuard)
export class AdminController {
    constructor(private readonly adminService: AdminServices){}

    @Get('/vendors')
    @swagger.ApiOkResponse({
        description: 'list of all vendors registered',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'limited access to resource',
        type: dtos.ResponseDto
    })
    // @Roles(dtos.Roles.ADMIN)
    getVendors(){
        return this.adminService.getVendors();
    }

    @Get('/vendor/:vendorId')
    @swagger.ApiOkResponse({
        description: 'vendor data',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'limited access to resource',
        type: dtos.ResponseDto
    })
    @Roles(dtos.Roles.ADMIN)
    getVendor(
        @Param('vendorId')vendorId:string,
    ){
        return this.adminService.getVendor(vendorId);
    }


    @Get('/users')
    @swagger.ApiOkResponse({
        description: 'list of all users registered',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'limited access to resource',
        type: dtos.ResponseDto
    })
    @Roles(dtos.Roles.ADMIN)
    getUsers(){
        return this.adminService.getUsers();
    }

    @Get('/user/:userId')
    @swagger.ApiOkResponse({
        description: 'user data',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'limited access to resource',
        type: dtos.ResponseDto
    })
    @Roles(dtos.Roles.ADMIN)
    getUser(
        @Param('userId')userId:string,
    ){
        return this.adminService.getUser(userId);
    }


    @Get('/riders')
    @swagger.ApiOkResponse({
        description: 'list of all riders registered',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'limited access to resource',
        type: dtos.ResponseDto
    })
    @Roles(dtos.Roles.ADMIN)
    getRiders(){
        return this.adminService.getRiders();
    }

    @Get('/rider/:riderId')
    @swagger.ApiOkResponse({
        description: 'rider data',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'limited access to resource',
        type: dtos.ResponseDto
    })
    @Roles(dtos.Roles.ADMIN)
    getRider(
        @Param('riderId')riderId:string,
    ){
        return this.adminService.getRider(riderId);
    }


}