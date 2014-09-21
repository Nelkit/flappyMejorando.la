//importar de node_modules pg para hacer consultas a posgresql
var pg = require('pg');
PUNTAJE = {};

//crear Table de jugadores
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
      client.query('DROP TABLE IF EXISTS jugadores');
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

//insertar puntaje en la tabla de jugadores
PUNTAJE.insertScore = function(scoreData)
{
    var autoincrement = getRandom(1, 60000);
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

      client.query("INSERT INTO jugadores VALUES ($1, $2, $3)", [autoincrement,scoreData.nombre,scoreData.puntos], function(err, result) {
        if(err) {
            return console.error('consulta error en ejecucion', err);
        }else{
            console.log("Nuevo Registro "+scoreData.nombre);
        }
        client.end();
      });
    });
}

//obtener el puntaje de los usuarios ordenados de mayor a menor
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
      client.query('SELECT * FROM jugadores ORDER BY puntos DESC LIMIT 5', function(err, results) {
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

//funcion que genera numeros aleatorios
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//exportar modulo para poder utlizarlo desde otro archivo
module.exports = PUNTAJE;