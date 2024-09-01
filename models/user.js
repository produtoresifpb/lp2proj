const Database = require('../database/database.js');

async function getAllUsers() {
  const db = await Database.connect();
  const sql = 'SELECT * FROM User';
  const users = await db.all(sql);
  return users;
}

async function getUserById(id) {
  const db = await Database.connect();
  const sql = 'SELECT * FROM User WHERE id = ?';
  const user = await db.get(sql, [id]);
  return user;
}

async function create({ email, name, password }) {
  const db = await Database.connect();
  const sql = 'INSERT INTO User (email, name, password) VALUES (?, ?, ?)';
  const { lastID } = await db.run(sql, [email, name, password]);
  return await getUserById(lastID);
}

module.exports = {
  getAllUsers,
  create,
  getUserById
};
