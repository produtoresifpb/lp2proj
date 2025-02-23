const express = require("express");
const multer = require('multer');
const upload = multer();
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { createUser, getUser } = require("../models/user.js");
const { z } = require('zod');
const validate = require("../middlewares/validate.js")

/* Tive q desativar os layouts nesses pra tirar a navbar e o footer */
router.get("/login", function (req, res, next) {
  res.render("auth/login", { layout: false });
});

router.post("/login", validate(z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  })
})), async function (req, res, next) {
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
      res.locals.userId = userId;
      return res.json({ auth: true, token, name });
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(401).json({ error: 'User not found' });
  }
});

router.get("/registro", function (req, res, next) {
  res.render("auth/registro", { layout: false });
});

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, "");

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
  }

  const calcularDigito = (base) => {
      let soma = 0;
      for (let i = 0; i < base.length; i++) {
          soma += parseInt(base[i]) * (base.length + 1 - i);
      }
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
  };

  const base = cpf.slice(0, 9);
  const digito1 = calcularDigito(base);
  const digito2 = calcularDigito(base + digito1);

  return cpf === base + digito1 + digito2;
}

// Rota de registro com validação de CPF
router.post("/registro", upload.none(), validate(
z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password2: z.string(),
    birthDate: z.string().date(),
    cpf: z.string({
        required_error: 'CPF é obrigatório.',
      })
      .refine((doc) => validarCPF(doc), 'CPF inválido.'),
  }),
})
), async (req, res, next) => {
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
    res.status(400).json({
      message: 'E-mail ou CPF já estão cadastrados.'
    });
}
});

router.get("/resetsenha", function (req, res, next) {
  res.render("auth/recusenha", { layout: false });
});

module.exports = router;
