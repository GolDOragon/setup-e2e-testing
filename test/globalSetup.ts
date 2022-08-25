import { DataSource } from 'typeorm';
import { ormConfig } from '../ormConfig';
import { entities } from '../src/database/entities';
import { migrations } from '../src/migrations';
import axios from 'axios';
import { getHash } from './getHash';

require('ts-node').register({ transpileOnly: true });

const API_PATH = 'http://integresql:5000/api/v1/templates/';
module.exports = async () => {
  console.log('[Global setup] Start');

  const hash = getHash();
  const apiResponse = await axios.post(API_PATH, {
    hash,
  });

  if (apiResponse.status !== 200) {
    throw new Error('InitializeTemplate: bad status');
  }

  global.dataSource = new DataSource({
    ...ormConfig(),
    ...apiResponse.data.database.config,
    entities,
    migrations,
  });

  await global.dataSource.initialize().then(() => {
    console.log('Data Source has been initialized');
  });
  await global.dataSource.runMigrations().then(() => {
    console.log('Migrations have been applied');
  });
  await global.dataSource.destroy();

  const response = await axios.put(`${API_PATH}${hash}`);
  if (response.status !== 204) {
    throw new Error('FinalizeTemplate: bad status');
  }

  console.log('[Global setup] Finish');
};
