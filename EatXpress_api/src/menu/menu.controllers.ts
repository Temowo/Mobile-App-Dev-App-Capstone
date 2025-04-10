import { Body, Controller, Get, Post, Req, Res, Param, UseGuards, Query, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, Injectable, Patch } from '@nestjs/common';
import { MenuService } from './menu.services';
import  * as dtos from 'src/core/dtos/fs.dtos';
import { Request } from 'express';
import * as swagger  from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/guards.role_guard';
import { Roles } from 'src/guards/guards.roles';
import { FileInterceptor } from '@nestjs/platform-express';

@swagger.ApiTags('menu')
@Controller('/api/menu')
@UseGuards(RolesGuard)
@Injectable()
export class MenuController {
    constructor(private menuService:MenuService){}

    @Post('')
    @swagger.ApiBearerAuth()
    @swagger.ApiCreatedResponse({
        description: 'Menu created...',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    })
    @swagger.ApiBadRequestResponse({
        description: 'invalid request payload',
    })
    @swagger.ApiConsumes('multipart/form-data')
    @swagger.ApiBody({
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string' },    
            price: { type: 'integer' },
            description: { type: 'string' },
            mealType: { type: 'string' },    
            category: { type: 'string' },
            file: {
              type: 'string',
              format: 'binary',
            },
          },
        },
    })
    @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
    @Roles(dtos.Roles.VENDOR)
    createMenu(
        @Body() createMenuDto: dtos.CreateMenuDtoType,
        @UploadedFile(
            new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: 'jpeg',
            })
            .addMaxSizeValidator({
                maxSize: 1048576 //1MB
            })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }),
        )file: Express.Multer.File,
        @Req()req:Request
    ){
        return this.menuService.createMenu(
            createMenuDto, file, req.user!.id
        )
    }


    @Patch('/update/:menuId')
    @swagger.ApiBearerAuth()
    @swagger.ApiOkResponse({
        description: ' menu price updated...',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    })
    @swagger.ApiBadRequestResponse({
        description: 'invalid request payload/parameter',
    })
    @swagger.ApiBody({ type: dtos.UpdateMenuPriceDto })
    @Roles(dtos.Roles.VENDOR)
    updateMenuPrice(
        @Param('menuId') menuId: string,
        @Body() priceDto: dtos.UpdateMenuPriceDtoType,
    ){
        return this.menuService.updateMenuPrice(priceDto.price, menuId);
    }

    //get menus with pagination
    @Get('/:page')
    @swagger.ApiBearerAuth()
    @swagger.ApiOkResponse({
        description: 'menu list retrieved...',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    })
    @swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    })
    @Roles(dtos.Roles.USER)
    getMenus(
        @Param('page') page: number
    ){
        return this.menuService.getMenus(page);
    }


    

    //get vendor menus
    @Get('/vendor')
    @swagger.ApiBearerAuth()
    @swagger.ApiOkResponse({
        description: 'vendor menu retrieved...',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    })
    @swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    })
    @Roles(dtos.Roles.VENDOR)
    getMenuByVendor(
        @Req()req:Request,
    ){
        return this.menuService.getVendorMenus(req.user.id);
    }

    
    //get menu by id
    @Get('/:menuId')
    @swagger.ApiBearerAuth()
    @swagger.ApiOkResponse({
        description: 'menu retrieved...',
        type: dtos.ResponseDto
    })
    @swagger.ApiForbiddenResponse({
        description: 'Forbidden, provide a valid token',
    })
    @swagger.ApiBadRequestResponse({
        description: 'invalid request parameter',
    })
    @Roles(dtos.Roles.VENDOR, dtos.Roles.USER)
    getMenuById(
        @Param('menuId')menuId:string
    ){
        return this.menuService.getMenuById(menuId);
    }

    

}