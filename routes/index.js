const express = require("express");
const router = express.Router();
const { getAllNotices } = require("../models/notice.js");
const { isAuthenticated } = require("../middlewares/auth.js");
const { getUserById } = require("../models/user.js");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const editais = await getAllNotices("", "");
  res.render("index", { editais: editais })
});

module.exports = router;
