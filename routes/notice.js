const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("notice/edital");
});
router.get("/create", function (req, res, next) {
  res.render("notice/create_notice");
});

module.exports = router;
