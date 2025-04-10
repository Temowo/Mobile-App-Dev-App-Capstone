import { Body, Controller, Get, Post, Req, Param, UseGuards } from '@nestjs/common';
import { AuthService }  from './auth.services';
import  * as dtos from 'src/core/dtos/fs.dtos';
import { Request } from 'express';
import * as swagger  from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/guards.role_guard';
import { Roles } from 'src/guards/guards.roles';


@swagger.ApiTags('auth')
@Controller('/api/auth')
@UseGuards(RolesGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  // admin register vendor
  @Post('/register/vendor')
  @swagger.ApiBearerAuth()
  @swagger.ApiCreatedResponse({
    description: 'new vendor registered',
    type: dtos.ResponseDto
  })
  @swagger.ApiForbiddenResponse({
    description: 'Forbidden, provide a valid token',
  })
  @swagger.ApiBadRequestResponse({
    description: 'invalid request payload',
  })
  @swagger.ApiBody({ type: dtos.RegisterVendorDto })
  @Roles(dtos.Roles.ADMIN)
  registerVendor(
    @Body() persona: dtos.RegisterVendorType,
  ){
    return this.authService.registerVendor(persona);
  }

  // admin register admin
  @Post('/register/admin')
  @swagger.ApiBearerAuth()
  @swagger.ApiCreatedResponse({
    description: 'add new admin',
    type: dtos.ResponseDto
  })
  @swagger.ApiForbiddenResponse({
    description: 'Forbidden, provide a valid token',
  })
  @swagger.ApiBadRequestResponse({
    description: 'invalid request payload',
  })
  @swagger.ApiBody({ type: dtos.RegisterAdminDto })
  @Roles(dtos.Roles.ADMIN)
  addAdmin(
    @Body() persona: dtos.RegisterAdminType,
  ){
    return this.authService.addAdmin(persona);
  }

  //user || rider registers
  @Post('/register')
  @swagger.ApiCreatedResponse({
    description: 'new user | rider registered',
    type: dtos.ResponseDto
  })
  @swagger.ApiBadRequestResponse({
    description: 'invalid request payload',
  })
  @swagger.ApiBody({ type: dtos.RegisterDto })
  registerPersona(
    @Body()persona: dtos.RegisterType,
  ){
    return this.authService.registerPersona(persona);
  }

  //verify email
  @Post('/verify-email')
   @swagger.ApiOkResponse({
    description: 'email address verification completed',
    type: dtos.ResponseDto
  })
  @swagger.ApiBadRequestResponse({
    description: 'invalid request payload',
  })
  @swagger.ApiBody({ type: dtos.VerifyEmailDto })
   verifyEmail(
    @Body() verifyDto: dtos.VerifyEmailType,
   ){
    return this.authService.verifyEmail(verifyDto);
   }



  // vendor || user || rider login
  @Post('/login')
  @swagger.ApiOkResponse({
    description: 'successful login with access token generated',
    type: dtos.ResponseDto
  })
  @swagger.ApiBadRequestResponse({
    description: 'invalid request payload',
  })
  @swagger.ApiBody({ type: dtos.LoginDto })
  signIn(
    @Body()creds: dtos.LoginDtoType,
  ){
    return this.authService.signIn(creds);
  }

  //refresh access token
  @Get('/refresh-token')
  @swagger.ApiBearerAuth()
  @swagger.ApiOkResponse({
    description: 'access token refreshed',
    type: dtos.ResponseDto
  })
  @swagger.ApiForbiddenResponse({
    description: 'invalid/missing request headers',
  })
  @Roles(dtos.Roles.ADMIN, dtos.Roles.VENDOR, dtos.Roles.USER, dtos.Roles.RIDER)
  refreshAccessToken(
    @Req()req:Request,
  ){
    return this.authService.refreshAccessToken(req);
  }

  // forget password
  @Post('/forget-pass')
  @swagger.ApiOkResponse({
    description: 'password recovery link sent to user | vendor | rider | admin inbox',
    type: dtos.ResponseDto
  })
  @swagger.ApiBadRequestResponse({
    description: 'invalid request payload',
  })
  @swagger.ApiBody({ type: dtos.ForgetPasswordDto })
  forgetPass(
    @Body()recoveryDto: {email:string},
  ){
    return this.authService.forgetPassword(recoveryDto);
  }

  // reset password
   @Post('/reset-password')
   @swagger.ApiOkResponse({
    description: 'password reset operation completed',
    type: dtos.ResponseDto
  })
  @swagger.ApiBadRequestResponse({
    description: 'invalid request payload',
  })
  @swagger.ApiBody({ type: dtos.PasswordResetDto })
   resetPass(
    @Body() resetDto: dtos.PasswordResetType,
   ){
    return this.authService.resetPassword(resetDto.password, resetDto.token);
   }

   
}
