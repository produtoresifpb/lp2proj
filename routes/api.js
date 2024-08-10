const express = require("express");
const { editais } = require("../db.js");
const uuid = require("uuid");
const router = express.Router();
const { getAllNotices } = require('../models/notice.js')


router.post("/editais/create", function (req, res, next) {
  
  const edital = {
    description: req.body.description,
    name: req.body.name,
    author: req.body.author,
  };

  editais.push(edital);
  res.status(201).render("sucess", { edital });

});

router.get("/editais/list", async function (req, res, next) {
  const editais = await getAllNotices()
  res.status(200).json(editais);
});

module.exports = router;
