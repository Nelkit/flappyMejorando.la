var debug = require('debug')('flappy_mejorandola');
var app = require('./app.js');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
