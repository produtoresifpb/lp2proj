const express = require("express");
const router = express.Router();
const { getAllNotices } = require("../models/notice.js");

router.get("/", async function (req, res, next) {
  try {
    const busca = req.query.b || "";
    const filtro = {
      order: req.query.flt || "",
      prazo: req.query.dt || "",
      apoio: req.query.ap || "",
      categoria: req.query.cta || "",
      valorMin: req.query.vlrmn || "",
      valorMax: req.query.vlrmx || "",
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

module.exports = router;
