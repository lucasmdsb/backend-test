import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import * as path from 'path';

describe('UploadController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/upload (POST) deve retornar 201 com taskId', async () => {
    const filePath = path.join(__dirname, 'fixtures/testImage.png');

    const res = await request(app.getHttpServer())
      .post('/upload')
      .attach('file', filePath)
      .expect(201);

    expect(res.body).toHaveProperty('taskId');
    expect(res.body.status).toBe('PENDING');
  });

  afterAll(async () => {
    await app.close();
  });
});