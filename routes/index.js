const express = require("express");
const router = express.Router();
const { getAllNotices } = require("../models/notice.js");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const editais = await getAllNotices("");
    res.render("index", { editais: editais });
  } catch (err) {
    res.status(500).redirect("/", { error: err });
  }
});

module.exports = router;
