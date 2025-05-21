import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true, unique: true })
  taskId!: string;

  @Prop({ required: true })
  originalName!: string;

  @Prop({ required: true, enum: ['PENDING', 'PROCESSING', 'DONE', 'ERROR'] })
  status!: string;

  @Prop()
  result?: string;

  @Prop({ default: Date.now })
  createdAt!: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);