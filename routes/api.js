var express = require('express');
var router = express.Router();
const { create, getAllNotices } = require('../models/edital');
const { getAllUsers, getUserById } = require('../models/user');

router.post('/editais/create', async function (req, res, next) {
  const users = await getAllUsers();
  const edital = {
    description: req.body.description,
    title: req.body.title,
    user_id: users[0].id,
  };

  const newEdital = await create(edital)
  res.status(201).render('sucess', { edital: newEdital });
});

router.get('/editais/list', async function (req, res, next) {
  const editais = await getAllNotices();
  const users = []
  for (const edital of editais) {
    const user = await getUserById(edital.user_id)
    users.push(user)
  }
  res.status(200).json({ editais, users });
});

module.exports = router;
