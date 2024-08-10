const express = require("express");
const router = express.Router();
const { getAllNotices } = require("../models/notice.js");

router.get("/", async function (req, res, next) {
  try {
    const editais = await getAllNotices("");
    res.render("notice/edital", { editais: editais });
  } catch (err) {
    res.status(500).redirect("/", { error: err });
  }
});

router.get("/create", function (req, res, next) {
  res.render("notice/create_notice");
});

module.exports = router;
