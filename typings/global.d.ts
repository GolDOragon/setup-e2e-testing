import { SuperTest, Test } from 'supertest';

declare global {
  var request: SuperTest<Test>;
  var dbName: string;
}
