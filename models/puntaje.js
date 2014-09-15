var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native
PUNTAJE = {};

PUNTAJE.createTable = function()
{
    var client = new pg.Client({
        user: "yoyrfzgjfuppyi",
        password: "4vVIbyZ2CAaZsZ1kQvgepUvg2A",
        database: "d8eqdo1o6qgc4r",
        port: 5432,
        host: "ec2-54-197-227-238.compute-1.amazonaws.com",
        ssl: true
    });
    client.connect(function(err) {
      if(err) {
        return console.error('no pudo conectar con postgres', err);
      }
      client.query('CREATE TABLE jugadores (id serial PRIMARY KEY, nombre TEXT, puntos INT)', function(err, result) {
        if(err) {
          return console.error('consulta error en ejecucion', err);
        }else{
          console.log("Nueva tabla creada");
        }
        client.end();
      });
    });
}

PUNTAJE.insertScore = function()
{
    var client = new pg.Client({
        user: "yoyrfzgjfuppyi",
        password: "4vVIbyZ2CAaZsZ1kQvgepUvg2A",
        database: "d8eqdo1o6qgc4r",
        port: 5432,
        host: "ec2-54-197-227-238.compute-1.amazonaws.com",
        ssl: true
    });
    var autoincrement = getRandom(1, 60000);
    client.connect(function(err) {
      if(err) {
        return console.error('no pudo conectar con postgres', err);
      }

      client.query("INSERT INTO jugadores VALUES ($1, $2, $3)", [autoincrement,'Jose', 3], function(err, result) {
        if(err) {
            return console.error('consulta error en ejecucion', err);
        }else{
            console.log("Nuevo Registro");
        }
        client.end();
      });
    });
}

PUNTAJE.getScore = function(callback)
{
    var client = new pg.Client({
        user: "yoyrfzgjfuppyi",
        password: "4vVIbyZ2CAaZsZ1kQvgepUvg2A",
        database: "d8eqdo1o6qgc4r",
        port: 5432,
        host: "ec2-54-197-227-238.compute-1.amazonaws.com",
        ssl: true
    });
    client.connect(function(err) {
      if(err) {
        return console.error('no pudo conectar con postgres', err);
      }
      client.query('SELECT * FROM jugadores', function(err, results) {
        if(err)
        {
            throw err;
        }
        else
        {
            callback(null, results.rows);
        }
        client.end();
      });
    });
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = PUNTAJE;