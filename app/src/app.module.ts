import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadModule } from './modules/upload/upload.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/trakto'),
    UploadModule,
    TaskModule,
  ],
})
export class AppModule {}