const express = require("express");
const multer = require('multer');
const upload = multer();
const router = express.Router();
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const { createUser, getUser } = require("../models/user.js");

/* Tive q desativar os layouts nesses pra tirar a navbar e o footer */
router.get("/login", function (req, res, next) {
  res.render("auth/login", { layout: false });
});

router.post("/login", async function (req, res, next) {
  try {
    const { email, password } = req.body
    const { id: userId, password: hash, name } = await getUser({ email });
    const match = await bcrypt.compare(password, hash);

    if (match) {
      const token = jwt.sign(
        { userId, name },
        process.env.JWT_SECRET,
        { expiresIn: 3600 } // 1h
      );
      return res.json({ auth: true, token, name });
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'User not found' });
  }
});

router.get("/registro", function (req, res, next) {
  res.render("auth/registro", { layout: false });
});

router.post("/registro", upload.none(), async (req, res, next) => {
  try {
    const user = req.body;
    delete user.password2;

    const createdUser = await createUser(user);

    delete createdUser.password;
    delete createdUser.cpf;
    delete createdUser.birthDate;
    delete createdUser.registerDate;

    return res.json(createdUser);
  } catch (e) {
    console.log(e)
    if (e.code == 'P2002') {
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
