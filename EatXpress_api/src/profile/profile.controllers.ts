import { Body, Controller, Get, Post, Req, Res, Param, UseGuards, Query } from '@nestjs/common';
import { ProfileService } from './profile.services';
import  * as dtos from 'src/core/dtos/fs.dtos';
import { Request, Response } from 'express';
import * as swagger  from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/guards.role_guard';
import { Roles } from 'src/guards/guards.roles';


@swagger.ApiTags('profile')
@Controller('/api/profile')
@UseGuards(RolesGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // save vendor
  @Post('/save-address')
  @swagger.ApiBearerAuth()
  @swagger.ApiCreatedResponse({
    description: 'address saved...',
    type: dtos.ResponseDto
  })
  @swagger.ApiForbiddenResponse({
    description: 'Forbidden, provide a valid token',
  })
  @swagger.ApiBadRequestResponse({
    description: 'invalid request payload | query parameter',
  })
  @swagger.ApiBody({ type: dtos.createAddressDto })
  @Roles(dtos.Roles.VENDOR, dtos.Roles.USER)
  createAddress(
    @Query('primary') primary:boolean,
    @Body() address: dtos.createAddressDtoType,
    @Req()req: Request,
  ){
    return this.profileService.saveAddress(address, req.user!.id, primary);
  }


  //get user profile
  @Get('')
  @swagger.ApiBearerAuth()
  @swagger.ApiOkResponse({
    description: 'address retrieved...',
    type: dtos.ResponseDto
  })
  @swagger.ApiForbiddenResponse({
    description: 'Forbidden, provide a valid token',
  })
  @Roles(dtos.Roles.VENDOR, dtos.Roles.USER)
  getProfile(
    @Req()req:Request,
  ){
    return this.profileService.getProfile('648c360641ac1ac420b77f1e'); //req.user!.id
  }

  //get all address
  @Get('/address')
  @swagger.ApiBearerAuth()
  @swagger.ApiOkResponse({
    description: 'all address retrieved...',
    type: dtos.ResponseDto
  })
  @swagger.ApiForbiddenResponse({
    description: 'Forbidden, provide a valid token',
  })
  @Roles(dtos.Roles.ADMIN)
  getAll(){
    return this.profileService.getAll();
  }


  //get user address
  @Post('/change-password')
  @swagger.ApiBearerAuth()
  @swagger.ApiOkResponse({
    description: 'password change successfully...',
    type: dtos.ResponseDto
  })
  @swagger.ApiForbiddenResponse({
    description: 'Forbidden, provide a valid token',
  })
  @swagger.ApiBadRequestResponse({
    description: 'invalid payload',
  })
  @Roles(dtos.Roles.ADMIN, dtos.Roles.VENDOR, dtos.Roles.USER, dtos.Roles.RIDER)
  changePassword(
    @Body()changePassDto : dtos.ChangePasswordDto,
    @Req()req: Request,
  ){
    return this.profileService.changePassword(req.user.id, changePassDto.oldPassword, changePassDto.newPassword);
  }

  //create vendor subaccount
  @Post('/bank-details')
  @swagger.ApiBearerAuth()
  @swagger.ApiCreatedResponse({
      description: 'bank deatails saved',
      type: dtos.ResponseDto
  })
  @swagger.ApiForbiddenResponse({
      description: 'Forbidden, provide a valid token',
  })
  @swagger.ApiBadRequestResponse({
      description: 'invalid request payload',
  })
  @swagger.ApiBody({ type: dtos.CreateSubAccountDto })
  @Roles(dtos.Roles.ADMIN, dtos.Roles.VENDOR)
  createCheckout(
      @Body() bankDetailsDto:dtos.CreateSubAccountType,
      @Req()req: Request,
  ){
      return this.profileService.saveVendorBankDetails(bankDetailsDto, req.user.id);
  }
  

}


