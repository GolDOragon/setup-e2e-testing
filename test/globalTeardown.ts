import { DataSource } from 'typeorm';
import { ormConfig } from '../ormConfig';
import { entities } from '../src/database/entities';
import { migrations } from '../src/migrations';
import { TEST_FILES } from './getTestFiles';

require('ts-node').register({ transpileOnly: true });

module.exports = async () => {
  console.log('[Global teardown] Start');
  const dataSource = new DataSource({ ...ormConfig(), entities, migrations });
  await dataSource.initialize();

  await Promise.all(
    TEST_FILES.map((file) =>
      dataSource.query(`DROP DATABASE IF EXISTS "${file}" WITH (FORCE)`),
    ),
  );
  console.log('Database instances have been dropped.')

  await dataSource.dropDatabase();
  console.log('Template database has been dropped.');
  await dataSource.destroy();
  console.log('[Global teardown] Finish');
  process.exit();
};
