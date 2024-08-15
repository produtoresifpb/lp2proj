const express = require("express");
const router = express.Router();
const { getAllNotices, createNotice } = require("../models/notice.js");

router.post("/editais/create", async function (req, res, next) {
  try {
    const notice = await createNotice({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      artisticCategory: req.body.artisticCategory,
      subscriptionDeadline: new Date(req.body.subscriptionDeadline).toISOString(),
      criteriosSelecao: req.body.criteriosSelecao,
      processoInscricao: req.body.processoInscricao,
      organizador:  req.body.organizador,
      detalhesFinanciamento: req.body.detalhesFinanciamento,
      dataPublicacao: new Date().toISOString()
    });
    res.status(201).render("notice/sucess", { edital: notice });
  } catch (err) {
    res.status(500).render("notice/create_notice", { error: err });
    console.log(err)
  }
});

router.get("/editais/list", async function (req, res, next) {
  // não sendo usado
  const busca = req.query.busca;
  const editais = await getAllNotices(busca || "");
  res.status(200).json(editais);
});

module.exports = router;
