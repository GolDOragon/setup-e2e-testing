require('ts-node').register({ transpileOnly: true });

module.exports = async () => {
  console.log('[Global teardown] Start');
  await global.dataSource.dropDatabase();
  await global.dataSource.destroy();
  console.log('[Global teardown] Finish');
  process.exit(0);
};
