const express = require("express");
const multer = require('multer');
const upload = multer();
const router = express.Router();
const { createUser, getUser } = require("../models/user.js");

/* Tive q desativar os layouts nesses pra tirar a navbar e o footer */
router.get("/login", function (req, res, next) {
  res.render("auth/login", { layout: false });
});

router.post("/login", async function (req, res, next) {
  try {
    const { email, password } = req.body
    console.log(email, password)
 
    const { id: userId, password: hash } = await getUser({ email });
    console.log(userId, hash)
 
    const match = await bcrypt.compare(password, hash);
 
    if (match) {
      const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: 3600 } // 1h
      );
 
      return res.json({ auth: true, token });
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
