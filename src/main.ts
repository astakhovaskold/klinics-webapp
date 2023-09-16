import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('/api/v1');
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
        .setTitle('Klinics API')
        .setVersion('1.0')
        .addBearerAuth()
        .addSecurityRequirements('bearer')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(3000);
}

bootstrap();
