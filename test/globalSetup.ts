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
  await dataSource.runMigrations();

  await dataSource.query(
    `ALTER DATABASE ${config.database} WITH is_template TRUE;`,
  );

  await dataSource.destroy();
};

const createInstancesForTests = async (names: string[]) => {
  const config = ormConfig();
  const client = new Client({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.username,
    password: config.password,
  });

  await client.connect();
  for (let file of names) {
    await client.query(
      `CREATE DATABASE "${file}" WITH TEMPLATE ${config.database}`,
    );
  }
  await client.end();
};

module.exports = async () => {
  console.log('[Global setup] Start');

  await createTemplateDB();
  console.log('Template database has been created.');

  await createInstancesForTests(TEST_FILES);
  console.log('Database instances have been created.');

  console.log('[Global setup] Finish');
};
