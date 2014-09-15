var express = require('express');
var router = express.Router();
var Puntaje = require('../models/puntaje');

router.get('/', function(req, res) {
    Puntaje.getScore(function(error, data)
    {
      res.send(JSON.stringify(data));
    });
});

module.exports = router;