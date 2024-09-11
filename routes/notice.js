const express = require("express");
const router = express.Router();
const { getAllNotices } = require("../models/notice.js");

router.get("/", async function (req, res, next) {
  try {
    const busca = req.query.b || "";
    const filtro = {
      order: req.query.flt || undefined,
      prazo: req.query.dt || undefined,
      apoio: req.query.ap || undefined,
      categoria: req.query.cta || undefined,
      valorMin: parseFloat(req.query.vlrmn) || undefined,
      valorMax: parseFloat(req.query.vlrmx) || undefined,
    };
    const editais = await getAllNotices(busca, filtro);
    res.render("notice/edital", {
      editais: editais,
      busca: busca,
      filtro: filtro,
    });
  } catch (err) {
    res.status(500).redirect("/", { error: err });
  }
});

router.get("/create", function (req, res, next) {
  res.render("notice/create_notice");
});

router.get("/feedback", function (req, res, next) {
  res.render("notice/feedback");
});

module.exports = router;
