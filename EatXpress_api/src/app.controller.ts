import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import * as swagger from '@nestjs/swagger';

@swagger.ApiTags('base')
@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/:code')
  getCached(
    @Param('code')code:string
  ) {
    return this.appService.getCached(code);
  }
}
