const express = require("express");
const router = express.Router();

/* Tive q desativar os layouts nesseS pra tirar a navbar e o footer */
router.get("/login", function (req, res, next) {
  res.render("login", { layout: false });
});

router.post("/login", function (req, res, next) {
  // rota de login aq
});

router.get("/registro", function (req, res, next) {
  res.render("registro", { layout: false });
});
router.get("/resetsenha", function (req, res, next) {
  res.render("recusenha", { layout: false });
});

module.exports = router;
