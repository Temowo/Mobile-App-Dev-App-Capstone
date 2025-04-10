import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ResponseDto } from './core/dtos/fs.dtos';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
    ){}

    //catch any unknown exception 
    catch(exception:unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;
        

        const context = host.switchToHttp();

        const httpStatus = exception instanceof HttpException
            ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        
        const responseBody:ResponseDto = {
            success: false,
            message: (exception as HttpException).message,
            data:{
                statusCode: httpStatus,
                timestamp: new Date().toISOString(),
                path: httpAdapter.getRequestUrl(context.getRequest()),
            }
        };

        httpAdapter.reply(context.getResponse(), responseBody, httpStatus);
    }

}