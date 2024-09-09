const Database = require('../database/database.js');

async function getAllNotices() {
  const db = await Database.connect();
  const sql = `
    SELECT Notice.*, User.*
    FROM Notice
    INNER JOIN User ON Notice.user_id = User.id
  `;
  const editais = await db.all(sql);
  return editais;
}

async function getNoticeById(id) {
  const db = await Database.connect();
  const sql = 'SELECT * FROM Notice WHERE id = ?';
  const edital = await db.get(sql, [id]);
  return edital;
}

async function create({ title, description, user_id }) {
  const db = await Database.connect();
  const sql = 'INSERT INTO Notice (title, description, user_id) VALUES (?, ?, ?)';
  const { lastID } = await db.run(sql, [title, description, user_id]);
  return await getNoticeById(lastID);
}

module.exports = {
  getAllNotices,
  create
};
