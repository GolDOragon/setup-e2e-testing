import { ConfigModule, registerAs } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DataSource } from 'typeorm';
import { migrations } from './src/migrations';
import { entities } from './src/database/entities';

export const ormConfig = registerAs('ormconfig', () => {
  if (process.env.RUN_TEST === 'true') {
    const testOptions: PostgresConnectionOptions = {
      type: 'postgres',
      ...global.databaseConfig, // default db for globalSetup, then templates
    };

    return testOptions;
  }

  const options: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
  };

  return options;
});

ConfigModule.forRoot({
  isGlobal: true,
  load: [ormConfig],
});

export default new DataSource({
  ...ormConfig(),
  entities,
  migrations,
});
