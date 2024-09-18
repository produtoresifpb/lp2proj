const express = require("express");
const router = express.Router();
const { getAllNotices, createNotice } = require("../models/notice.js");

router.post("/editais/create", async function (req, res, next) {
  try {
    const notice = await createNotice({
      title: req.body.title,
      organizador: req.body.organizador,
      description: req.body.description,
      support: req.body.support,
      artisticCategory: req.body.artisticCategory,
      subscriptionDeadline: new Date(
        req.body.subscriptionDeadline
      ).toISOString(),
      criteriosSelecao: req.body.criteriosSelecao,
      processoInscricao: req.body.processoInscricao,
      detalhesFinanciamento: req.body.detalhesFinanciamento,
      valorFinanciamento: parseFloat(req.body.valorFinanciamento),
      dataPublicacao: new Date().toISOString(),
    });
    res.status(201).render("notice/sucess", { edital: notice });
  } catch (err) {
    res.status(500).render("notice/create_notice", { error: err });
  }
});

router.get("/editais/list", async function (req, res, next) {
  // não sendo usado
  const busca = req.query.busca;
  const editais = await getAllNotices(busca || "");
  res.status(200).json(editais);
});

module.exports = router;
