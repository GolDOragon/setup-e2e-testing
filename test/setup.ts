import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as path from 'path';

const getDBName = () =>
  path.basename(expect.getState().testPath).split('.')[0] ||
  'basic_basic_db_name';

jest.setTimeout(10_000);
let app: INestApplication;

beforeAll(async () => {
  global.dbName = getDBName();

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();

  global.request = request(app.getHttpServer());
}, 15_000);

afterAll(async () => {
  await app.close();
});
