import { Controller, Get, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Status')
@Controller('status')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':taskId')
  async getStatus(@Param('taskId') taskId: string) {
    return this.taskService.getStatus(taskId);
  }
}