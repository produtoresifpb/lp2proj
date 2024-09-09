var express = require('express');
var router = express.Router();
const { create, getAllNotices } = require('../models/edital');
const { getAllUsers, getUserById } = require('../models/user');

router.post('/editais/create', async function (req, res, next) {
  const users = await getAllUsers();
  const edital = {
    description: req.body.description,
    title: req.body.title,
    user_id: req.body.conta,
  };

  const newEdital = await create(edital)
  res.status(201).render('sucess', { edital: newEdital });
});

router.get('/editais/list', async function (req, res, next) {
  const editais = await getAllNotices();
  res.status(200).json({ editais });
});

module.exports = router;
