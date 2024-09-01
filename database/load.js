const Migration = require('./migration.js');
const Seed = require('./seeders.js');

async function load() {
  await Migration.up();
  await Seed.up();
}

load();