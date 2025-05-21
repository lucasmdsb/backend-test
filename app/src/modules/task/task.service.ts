import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async getStatus(taskId: string) {
    const task = await this.taskModel.findOne({ taskId });
    if (!task) throw new NotFoundException('Task not found');

    return {
      taskId: task.taskId,
      status: task.status,
      result: task.result || null,
    };
  }
}