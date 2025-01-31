const express = require("express");
const router = express.Router();
const { getAllNotices } = require("../models/notice.js");
const { isAuthenticated } = require("../middlewares/auth.js");
const { getUserById, getUser } = require("../models/user.js");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const editais = await getAllNotices("", "");  
  res.render("index", { editais: editais })
});

router.get("/profile", isAuthenticated, async function (req, res, next) {
  console.log(req.userId)
  const user = await getUserById(req.userId);
  console.log(user)
  res.render("profile", { user: req.user })
});

module.exports = router;
