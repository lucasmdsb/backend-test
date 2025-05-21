import * as amqp from 'amqplib';
import { ConsumeMessage } from 'amqplib';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { MongoClient } from 'mongodb';

const RABBITMQ_URI = process.env.RABBITMQ_URI || 'amqp://localhost';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const IMAGE_STORAGE_PATH = process.env.IMAGE_STORAGE_PATH || './uploads';
const QUEUE_NAME = 'image_tasks';

async function startWorker() {
  console.log('Iniciando worker...');
  const conn = await amqp.connect(RABBITMQ_URI);
  const channel = await conn.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });

  const mongo = new MongoClient(MONGO_URI);
  await mongo.connect();
  const db = mongo.db('trakto');
  const tasks = db.collection('tasks');

  channel.consume(QUEUE_NAME, async (msg: ConsumeMessage | null) => {
      if (!msg) return;

      try {
        const content = JSON.parse(msg.content.toString());
        const { taskId, ext, originalName } = content;

        console.log(`[x] Processando task ${taskId}`);

        const inputPath = path.join(IMAGE_STORAGE_PATH, `${taskId}-original${ext}`);
        const outputPath = path.join(IMAGE_STORAGE_PATH, `${taskId}-optimized.jpg`);

        await sharp(inputPath).resize(800).jpeg({ quality: 80 }).toFile(outputPath);

        await tasks.updateOne(
          { taskId },
          { $set: { status: 'DONE', result: outputPath } }
        );

        console.log(`[✓] Task ${taskId} finalizada`);
        channel.ack(msg);
      } catch (error) {
        console.error('Erro ao processar:', error);
        if (msg) channel.nack(msg, false, false);
      }
    },
    { noAck: false }
  );
}

startWorker().catch(console.error);