var express = require('express');
const  { editais } = require('../db.js')
const uuid = require('uuid')
var router = express.Router();

router.post('/editais/create', function(req, res, next) { // cria um edital
    const date = new Date()
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const year = date.getFullYear();
    const creationDate = `${day}/${month}/${year}`;
    
    const edital = {
        description: req.body.description,
        name: req.body.name,
        author: req.body.author,
        creationDate,
        id: uuid.v4()
    }
    // console.log(edital);
    
    editais.push(edital); // bota no array
    res.status(201).render('sucess', {edital});

    // console.log('[ DEBUG ] Edital criado com sucesso. Identificador dele: ' + edital.id);
});

router.get('/editais/list', function(req, res, next) { // lista os editais
    res.status(200).json({editais});
});

module.exports = router;
