import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../task/task.schema';
import { Model } from 'mongoose';
import * as amqp from 'amqplib';

@Injectable()
export class UploadService {
  private queue = 'image_tasks';
  private rabbitmqUrl = process.env.RABBITMQ_URI || 'amqp://localhost';

  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>
  ) {}

  async enqueueTask(taskId: string, originalName: string, ext: string) {
    await this.taskModel.create({
      taskId,
      status: 'PENDING',
      originalName,
      createdAt: new Date(),
    });

    const conn = await amqp.connect(this.rabbitmqUrl);
    const channel = await conn.createChannel();
    await channel.assertQueue(this.queue, { durable: true });

    const payload = JSON.stringify({ taskId, originalName, ext });
    channel.sendToQueue(this.queue, Buffer.from(payload), { persistent: true });

    await channel.close();
    await conn.close();

    return { taskId, status: 'PENDING' };
  }
}