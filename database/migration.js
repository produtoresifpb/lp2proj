const Database = require('./database.js');

async function up() {
  const db = await Database.connect();

  const userSQL = `
      CREATE TABLE "User" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "email" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "profile" TEXT NOT NULL DEFAULT 'PUBLIC'
      );
      `;

  const noticeSQL =
    `CREATE TABLE "Notice" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "title" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "user_id" INTEGER NOT NULL,
        FOREIGN KEY ("user_id") REFERENCES "User" ("id")
      );
  `;

  await db.run(userSQL);
  await db.run(noticeSQL);
}

module.exports = { up };
