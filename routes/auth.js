const express = require("express");
const multer = require('multer');
const upload = multer();
const router = express.Router();
const { createUser } = require("../models/user.js");


/* Tive q desativar os layouts nesses pra tirar a navbar e o footer */
router.get("/login", function (req, res, next) {
  res.render("auth/login", { layout: false });
});

router.post("/login", function (req, res, next) {
  // rota de login aq
});

router.get("/registro", function (req, res, next) {
  res.render("auth/registro", { layout: false });
}); 

router.post("/registro", upload.none(), async (req, res, next) => {
  try {
    const user = req.body;
    delete user.password2;
    console.log(user);
    
    const createdUser = await createUser(user);
    
    delete createUser.password;
    delete createUser.cpf;
    delete createUser.birthDate;
    delete createUser.registerDate;

    return res.json(createdUser);
  } catch (e) {
    console.log(e)
    if(e.code == 'P2002') {
      res.status(400).json({
        message: 'E-mail ou CPF já estão cadastrados.'
       })
    }
  }
});

router.get("/resetsenha", function (req, res, next) {
  res.render("auth/recusenha", { layout: false });
});

module.exports = router;
