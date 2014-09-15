var express = require('express');
var router = express.Router();
var Puntaje = require('../models/puntaje');

/* GET users listing. */
router.get('/', function(req, res) {
    Puntaje.createTable();
    res.end();
});

module.exports = router;

