import { DataSource } from 'typeorm';
import { ormConfig } from '../ormConfig';
import { entities } from '../src/database/entities';
import { migrations } from '../src/migrations';

require('ts-node').register({ transpileOnly: true });

module.exports = async () => {
  console.log('[Global teardown] Start');
  const files = ['user1', 'user2', 'user3', 'user4', 'user5', 'user6'];

  const dataSource = new DataSource({ ...ormConfig(), entities, migrations });
  await dataSource.initialize();

  for (let file of files) {
    await dataSource.query(`DROP DATABASE IF EXISTS "${file}" WITH (FORCE)`);
    console.log(`db "${file}" has been dropped.`);
  }

  await dataSource.dropDatabase();
  await dataSource.destroy();
  console.log('[Global teardown] Finish');
  process.exit(0);
};
