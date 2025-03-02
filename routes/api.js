const express = require("express");
const router = express.Router();
const { z } = require("zod");
const validate = require("../middlewares/validate.js");
const { getAllNotices, createNotice } = require("../models/notice.js");
const { createPdf } = require("../models/pdf.js");
const { isAuthenticated } = require("../middlewares/auth.js");
const { Email } = require("../controllers/email.js");
const multer = require("multer");
const uploadConfig = require("../controllers/multer.js");

router.get("/acc/get-session-name", isAuthenticated, (req, res, next) => {
  console.log(req.userId, req.name);
  if (req.userId && req.name) {
    res.status(200).send({ name: req.name });
  }
});

router.post("/send-email/", (req, res) => {
  console.log("send-email");
  const email = req.body.email;
  Email.send(email);
  res.status(200).send("Email de verificação enviado");
});

router.post("/check-code/", (req, res) => {
  const email = req.body.email;
  const code = req.body.code;
  console.log(req.body);
  const check = Email.checkCode(email, code);
  console.log(check);
  if (check) {
    res.status(200).send("Código correto");
  } else {
    res.status(400).send("Código incorreto");
  }
});

router.post(
  "/editais/create",
  multer(uploadConfig).single("pdf"),
  async function (req, res, next) {
    const schema = z.object({
      title: z.string(),
      organizador: z.string(),
      description: z.string(),
      support: z.string(),
      artisticCategory: z.string(),
      subscriptionDeadline: z.string().date(),
      criteriosSelecao: z.string(),
      processoInscricao: z.string(),
      detalhesFinanciamento: z.string(),
      valorFinanciamento: z.string(),
    });
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json(result.error);
    }

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
      if (req.file) {
        const path = `/attachments/${req.file.filename}`;
        const noticeID = notice.id;

        await createPdf({ noticeID, path });
      }
      res.status(201).render("notice/sucess", { edital: notice });
    } catch (err) {
      console.log(err)
      res.status(500).render("notice/create_notice", { error: err });
    }
  }
);

router.get("/editais/list", async function (req, res, next) {
  // não sendo usado
  const busca = req.query.busca;
  const editais = await getAllNotices(busca || "");
  res.status(200).json(editais);
});

module.exports = router;
