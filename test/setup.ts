import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import axios from 'axios';
import { getHash } from './getHash';

const API_PATH = 'http://integresql:5000/api/v1/templates/';

jest.setTimeout(10_000);
let app: INestApplication;
beforeAll(async () => {
  const dbResponse = await axios.get(API_PATH + getHash() + '/tests');
  global.databaseConfig = dbResponse.data.database.config;

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();

  global.request = request(app.getHttpServer());
});

afterAll(() => {
  app.close();
});
