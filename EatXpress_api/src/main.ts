import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';


async function bootstrap() {
  
  const app = await NestFactory.create(AppModule, 
    {
      logger: console,
      
    }
  );  

  
  //setup swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('EatXpress Swagger Ui')
    .setDescription('Endpoint signatures for FoodSwipe API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('swagger', app, document, 
    {
      customSiteTitle: 'EatXpress Swagger UI',
      customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
      customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
      ],
      customCssUrl: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
      ],
    }
    );  
    
    app.enableCors();
    app.use(helmet());
  
    app.useGlobalPipes(
      new ValidationPipe({
        disableErrorMessages: true,
        whitelist:true,
        forbidNonWhitelisted: true,
        skipMissingProperties: true,
      })
    );
  
  await app.listen(5120);

}

bootstrap();
