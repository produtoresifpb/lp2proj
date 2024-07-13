var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/edital', function(req, res, next) {
  res.render('edital');
});
router.get('/editais/create', function(req, res, next) {
  res.render('create_notice');
});

module.exports = router;
