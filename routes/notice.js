const express = require("express");
const router = express.Router();
const { z } = require('zod');
const validate = require('../middlewares/validate.js');
const { getAllNotices, getNoticeById } = require("../models/notice.js");
const { createNoticeFeedback } = require("../models/noticeFeedback.js");
const { updateUser, getUserById } = require('../models/user.js')
const { isAuthenticated } = require('../middlewares/auth.js');

router.get("/", validate(z.object({
  query: z.object({
    flt: z.string().optional(),
    prazo: z.string().optional(),
    ap: z.string().optional(),
    cta: z.string().optional(),
    vlrmn: z.string().optional(),
    vlrmx: z.string().optional(),
    b: z.string().optional(),
  })
})), async function (req, res, next) {
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
    console.log(editais[0])
    res.render("notice/edital", {
      editais: editais,
      busca: busca,
      filtro: filtro,
    });
  } catch (err) {
    res.status(500).redirect("/", { error: err });
  }
});

router.get('/editais-favoritos', isAuthenticated, async (req, res, next) => {
  const { EditaisFavoritos: editais } = await getUserById(req.userId)
  res.status(200).json(editais)
})

router.post('/add-favorite/:id', isAuthenticated, validate(
  z.object({
    params: z.object({
      id: z.string(),
    }),
  })
), async (req, res, next) => {
  const idEdital = parseInt(req.params.id);

  try {
    const updatedUser = await updateUser({
      id: req.userId,
      data: {
        EditaisFavoritos: {
          connect: {
            id: idEdital
          }
        }
      }
    });
    if (updatedUser) {
      res.json({ success: true, message: 'Edital adicionado aos favoritos.' });
    } else {
      throw new Error('Usuário não encontrado ou falha ao atualizar.');
    }
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    res.status(500).json({ success: false, message: 'Erro ao adicionar favorito.' });
  }
});


router.get("/create", function (req, res, next) {
  res.render("notice/create_notice");
});

router.get("/feedback/:id", async function (req, res, next) {
  const editalID = parseInt(req.params.id);
  res.render("notice/feedback", { editalID });
});

router.post("/feedback/:id", validate(z.object({
  params: z.object({
    id: z.string()
  }),
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    subject: z.string(),
    descriptionProblem: z.string(),
  }),
})), async function (req, res, next) {
  try {
    const noticeFeedback = await createNoticeFeedback({
      userName: req.body.name,
      userEmail: req.body.email,
      problemSubject: req.body.subject,
      problemDescription: req.body.descriptionProblem,
      noticeID: parseInt(req.params.id)
    });

    res.status(201).render("notice/sucessfeedback", { edital: noticeFeedback });
  } catch (err) {
    console.log(err)
    res.status(500).render("notice/feedback", { error: err });
  }
}),

  module.exports = router;
