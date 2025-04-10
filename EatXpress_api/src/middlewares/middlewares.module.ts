import { Module } from '@nestjs/common';
import { UtilsModule } from 'src/utils/utils.module';
import { AuthMiddleware } from './middlewares.auth_middleware';
import { PaymentMiddleware } from './middlewares.payment_webhook';


@Module({
    imports:[UtilsModule],
    providers:[AuthMiddleware, PaymentMiddleware],
    exports:[AuthMiddleware, PaymentMiddleware]
})
export class MiddlewaresModule {}
