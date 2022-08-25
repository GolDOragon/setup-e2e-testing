import { DataSource } from 'typeorm';
import { ormConfig } from '../ormConfig';
import { entities } from '../src/database/entities';
import { migrations } from '../src/migrations';
import * as fs from 'fs';
import * as path from 'path';

require('ts-node').register({ transpileOnly: true });

module.exports = async () => {
  console.log('[Global teardown] Start');

  const files = fs
    .readdirSync(path.resolve(__dirname))
    .filter((fn) => fn.endsWith('.e2e-spec.ts'))
    .map((fn) => fn.split('.')[0]);

  const dataSource = new DataSource({ ...ormConfig(), entities, migrations });
  await dataSource.initialize();

  for (let file of files) {
    await dataSource.query(`DROP DATABASE IF EXISTS "${file}" WITH (FORCE)`);
  }
  await dataSource.dropDatabase();
  console.log('Origin db has been dropped.');
  await dataSource.destroy();
  console.log('[Global teardown] Finish');
  process.exit(0);
};
