var sqlite3 = require('sqlite3').verbose(),
db = new sqlite3.Database('flappy.db'),
PUNTAJE = {};

//crear la tabla en la base de datos
PUNTAJE.createTable = function()
{
    db.run("DROP TABLE IF EXISTS jugadores");
    db.run("CREATE TABLE IF NOT EXISTS jugadores (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, puntos INTEGER)");
    console.log("La tabla jugadores ha sido correctamente creada");
}

//inserta un nuevo registro en la tabla jugadores
PUNTAJE.insertScore = function(scoreData)
{
    var stmt = db.prepare("INSERT INTO jugadores VALUES (?,?,?)");
    stmt.run(null,scoreData.nombre,scoreData.puntos);
    stmt.finalize();

    console.log("Nuevo Puntaje de: "+scoreData.nombre);
}

PUNTAJE.getScore = function(callback)
{
    db.all("SELECT * FROM jugadores", function(err, rows) {
        if(err)
        {
            throw err;
        }
        else
        {
            callback(null, rows);
        }
    });
}

module.exports = PUNTAJE;