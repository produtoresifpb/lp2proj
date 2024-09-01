const { resolve } = require('node:path');
const { readFileSync } = require('node:fs');
const User = require('../models/user.js');
const Notice = require('../models/edital.js');

async function up() {
  const file = resolve('database', 'seeders.json');

  const seed = JSON.parse(readFileSync(file));
  for (const user of seed.users) {
    await User.create(user);
  }
  for (const notice of seed.notices) {
    await Notice.create(notice);
  }
}

module.exports = { up };
