import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Client } from 'pg';
import { ormConfig } from '../ormConfig';
import * as path from 'path';

const createDatabaseForTest = async (dbName: string) => {
  const config = ormConfig();
  const client = new Client({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.username,
    password: config.password,
  });
  await client.connect();
  await client.query(
    `CREATE DATABASE "${dbName}" WITH TEMPLATE ${config.database}`,
    (err) => {
      if (err) throw err;
      client.end();
    },
  );
};
const getDBName = () =>
  path.basename(expect.getState().testPath).split('.')[0] ||
  'basic_basic_db_name';

jest.setTimeout(10_000);
let app: INestApplication;

beforeAll(async () => {
  const dbName = getDBName();
  // await createDatabaseForTest(dbName);
  global.dbName = dbName;

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();

  global.request = request(app.getHttpServer());
}, 15_000);

afterAll(async () => {
  await app.close();

  // const config = ormConfig();
  // const client = new Client({
  //   host: config.host,
  //   port: config.port,
  //   database: 'postgres',
  //   user: config.username,
  //   password: config.password,
  // });

  // await client.connect();
  // console.warn(`DROP DATABASE IF EXISTS "${config.database}" WITH (FORCE)`);
  // await client.query(
  //   `DROP DATABASE IF EXISTS "${config.database}"; --WITH (FORCE)`,
  // );
  // await client.end();

  // const dataSource = new DataSource({ ...config, entities, migrations });
  // await dataSource.initialize();
  // await dataSource.dropDatabase();
  // await dataSource.destroy();
});
