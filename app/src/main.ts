import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const uploadPath = process.env.IMAGE_STORAGE_PATH || './uploads';
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  console.log('App rodando na porta 3000');
}
bootstrap();