var express = require('express');
var router = express.Router();
var Puntaje = require('../models/puntaje');

router.get('/', function(req, res) {
    Puntaje.insertScore(
        {
            // nombre:req.body.name,
            // puntos:req.body.score
            nombre:"Daniela",
            puntos:40
        }
    );
    console.log('processing');
    res.end();
});

module.exports = router;