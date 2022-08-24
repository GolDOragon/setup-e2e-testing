import { SuperTest, Test } from 'supertest';
import { DataSource } from 'typeorm';

declare global {
  var request: SuperTest<Test>;
  var dataSource: DataSource;
}
