import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './modules/task/task.schema';
import { TaskController } from './modules/task/task.controller';
import { TaskService } from './modules/task/task.service';
import { UploadController } from './modules/upload/upload.controller';
import { UploadService } from './modules/upload/upload.service';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/trakto'),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [UploadController, TaskController],
  providers: [UploadService, TaskService],
})
export class AppModule {}