import { DataSource } from 'typeorm';
import { ormConfig } from '../ormConfig';
import { entities } from '../src/database/entities';
import { migrations } from '../src/migrations';
import { Client } from 'pg';

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

  dataSource.destroy();
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

  const files = ['user1', 'user2', 'user3', 'user4', 'user5', 'user6'];

  for (let file of files) {
    await createDatabaseForTest(file);
    console.log('created ' + file + ' db');
  }
  console.log('[Global setup] Finish');
};
