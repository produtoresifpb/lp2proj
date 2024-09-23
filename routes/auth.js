const express = require("express");
const router = express.Router();
const { createUser } = require("../models/user.js");

/* Tive q desativar os layouts nesses pra tirar a navbar e o footer */
router.get("/login", function (req, res, next) {
  res.render("login", { layout: false });
});

router.post("/login", function (req, res, next) {
  // rota de login aq
});

router.get("/registro", function (req, res, next) {
  res.render("registro", { layout: false });
});

router.post("/registro", async (req, res, next) => {
  const user = req.body;
  delete user.password2;
  const createdUser = await createUser(user);

  delete createUser.password;
  delete createUser.cpf;
  delete createUser.birthDate;
  delete createUser.registerDate;
  return res.json(createdUser);
});

router.get("/resetsenha", function (req, res, next) {
  res.render("recusenha", { layout: false });
});

module.exports = router;
