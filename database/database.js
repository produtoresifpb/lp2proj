const { resolve } = require('node:path');
const Database = require('./sqlite.js');

const dbFile = resolve('database', 'db.sqlite');

async function connect() {
  return await Database.open(dbFile);
}

module.exports = { connect };