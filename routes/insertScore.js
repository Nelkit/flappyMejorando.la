var express = require('express');
var router = express.Router();
var Puntaje = require('../models/puntaje');

router.get('/', function(req, res) {
    Puntaje.insertScore();
    res.end();
});

module.exports = router;