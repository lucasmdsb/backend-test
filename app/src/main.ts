import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';
import { UploadController } from './modules/upload/upload.controller';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Trakto Image API')
    .setDescription('API para upload e otimização de imagens')
    .setVersion('1.0')
    .build();

    const document = SwaggerModule.createDocument(app, config, {
      include: [UploadController],
    });

  SwaggerModule.setup('/api', app, document);

  await app.listen(3000);
  console.log('API rodando em http://localhost:3000');
  console.log('Swagger em http://localhost:3000/api');
}
bootstrap();