const express = require("express");
const router = express.Router();
const { getAllNotices, createNotice } = require("../models/notice.js");

router.post("/editais/create", async function (req, res, next) {
  try {
    const notice = await createNotice({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
    });
    res.status(201).render("notice/sucess", { edital: notice });
  } catch (err) {
    res.status(500).render("notice/create_notice", { error: err });
  }
});

router.get("/editais/list", async function (req, res, next) {
  const busca = req.query.busca;
  const editais = await getAllNotices(busca || "");
  res.status(200).json(editais);
});

module.exports = router;
