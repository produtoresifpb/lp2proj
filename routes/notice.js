const express = require("express");
const router = express.Router();
const { getAllNotices } = require("../models/notice.js");

router.get("/", async function (req, res, next) {
  try {
    const busca = req.query.b;
    const filter = req.query.f || ''
    const editais = await getAllNotices(busca || "", filter);
    res.render("notice/edital", { editais: editais });
  } catch (err) {
    res.status(500).redirect("/", { error: err });
  }
});

router.get("/create", function (req, res, next) {
  res.render("notice/create_notice");
});

module.exports = router;
