import { SuperTest, Test } from 'supertest';

declare global {
  var request: SuperTest<Test>;
  // var dataSource: DataSource;
  // var databaseConfig: {
  //   host: string;
  //   port: number;
  //   username: string;
  //   password: string;
  //   database: string;
  // };
  var dbName: string;
}
