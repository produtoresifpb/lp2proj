var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/registro', function(req, res, next) {
  res.render('registro');
});
router.get('/resetsenha', function(req, res, next) {
  res.render('recusenha');
});

module.exports = router;
