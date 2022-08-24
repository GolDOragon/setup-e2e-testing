import { DataSource } from 'typeorm';
import { ormConfig } from '../ormConfig';
import { entities } from '../src/database/entities';
import { migrations } from '../src/migrations';

require('ts-node').register({ transpileOnly: true });

module.exports = async () => {
  console.log('[Global setup] Start');

  global.dataSource = new DataSource({
    ...ormConfig(),
    entities,
    migrations,
  });

  await global.dataSource.initialize().then(() => {
    console.log('Data Source has been initialized');
  });
  await global.dataSource.runMigrations().then(() => {
    console.log('Migrations have been applied');
  });

  console.log('[Global setup] Finish');
};
