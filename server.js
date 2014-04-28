var connect = require('connect'),
  http = require('http'),
  multiwii = require('multiwii'),
  Wii = multiwii.Wii,
  socketlistener = require('./lib/socketlistener');

var app = connect()
  .use(connect.static(__dirname))
  .use(connect.static(__dirname + '/bower_components'));

var server = http.createServer(app).listen(9001);

var io = require('socket.io').listen(server);
var sockets = [];

var wii = new Wii();

io.sockets.on('connection', function (socket) {
  if(sockets.indexOf(socket) === -1) {
    sockets.push(socket);
    var listener = socketlistener.create(socket, wii);
    socket.on('disconnect', function() {
      listener.dispose();
      sockets = sockets.filter(function(s) { return socket !== s; });
    });
  }
});