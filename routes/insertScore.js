var express = require('express');
var router = express.Router();
var Puntaje = require('../models/puntaje');

router.post('/', function(req, res) {
    Puntaje.insertScore(
        {
            nombre:req.body.name,
            puntos:req.body.score
        }
    );
    res.redirect("/");
});

module.exports = router;