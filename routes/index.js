var express = require('express');
const { getAllUsers } = require('../models/user')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
router.get('/edital', function (req, res, next) {
  res.render('edital');
});
router.get('/editais/create', async function (req, res, next) {
  const users = await getAllUsers();
  res.render('create_notice', { users });
});

module.exports = router;
