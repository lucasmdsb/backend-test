import { Controller, Get, Param } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('status')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':taskId')
  async getStatus(@Param('taskId') taskId: string) {
    return this.taskService.getStatus(taskId);
  }
}