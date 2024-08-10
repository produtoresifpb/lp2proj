const express = require("express");
const router = express.Router();
const { getAllNotices, createNotice } = require('../models/notice.js')


router.post("/editais/create", async function (req, res, next) {

  const edital = {
    description: req.body.description,
    title: req.body.name,
    author: req.body.author,
  };

  const notice = await createNotice(edital)
  res.status(201).render("sucess", { edital: notice });
});

router.get("/editais/list", async function (req, res, next) {
  const busca = req.query.busca
  const editais = await getAllNotices(busca || '')
  res.status(200).json(editais);
});

module.exports = router;
