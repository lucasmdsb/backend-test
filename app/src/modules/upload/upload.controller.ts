import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { diskStorage } from 'multer';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: process.env.IMAGE_STORAGE_PATH || './uploads',
    }),
  }))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const taskId = uuidv4();
    const ext = path.extname(file.originalname);
    const storagePath = process.env.IMAGE_STORAGE_PATH || './uploads';

    const originalPath = file.path;
    const finalPath = path.join(storagePath, `${taskId}-original${ext}`);

    fs.renameSync(originalPath, finalPath);

    await this.uploadService.enqueueTask(taskId, file.originalname, ext);
    
    return { taskId, status: 'PENDING' };
  }
}