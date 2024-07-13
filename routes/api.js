var express = require('express');
const  { editais } = require('../db.js')
const uuid = require('uuid')
var router = express.Router();


router.post('/editais/create', function(req, res, next) { // cria um edital
    const date = new Date()
    const creationDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`

    const edital = {
        name: req.query.name,
        author: req.query.autor,
        creationDate,
        id: uuid.v4()
    }

    editais.push(edital) // bota no array

    res.status(201).json({
        message: 'Edital criado.',
        id: edital.id
    })

    console.log('[ DEBUG ] Edital criado com sucesso. Identificador dele: ' + edital.id)
    
});

router.get('/editais/list', function(req, res, next) { // lista os editais
    res.status(200).json({
        editais
    })
})

module.exports = router;
