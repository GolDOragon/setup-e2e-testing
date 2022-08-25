import { DataSource } from 'typeorm';
import { ormConfig } from '../ormConfig';
import { entities } from '../src/database/entities';
import { migrations } from '../src/migrations';
import { Client } from 'pg';
import { TEST_FILES } from './getTestFiles';

require('ts-node').register({ transpileOnly: true });

const createTemplateDB = async () => {
  const config = ormConfig();
  const dataSource = new DataSource({ ...config, entities, migrations });

  await dataSource.initialize();
  console.log('Initialize connection');
  await dataSource.runMigrations();
  console.log('Apply Migrations');

  await dataSource.query(
    `ALTER DATABASE ${config.database} WITH is_template TRUE;`,
  );

  await dataSource.destroy();
};

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

module.exports = async () => {
  console.log('[Global setup] Start');
  await createTemplateDB();

  for (let file of TEST_FILES) {
    await createDatabaseForTest(file);
  }
  console.log('[Global setup] Finish');
};
