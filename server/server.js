var connect = require('connect')
  , http = require('http')
  , Wii = require('./src/wii').Wii
  , socketlistener = require('./src/socketlistener');

var app = connect()
  .use(connect.static('www'))
  .use(connect.static('../client/bower_components'))
  .use(function(req, res){
    res.end('Hello from Connect!\n');
  });

var server = http.createServer(app).listen(3000);

var io = require('socket.io').listen(server);
var sockets = [];

var wii = new Wii();
wii.connect(function() {

  wii.on('data', function(data) {
    //console.log(data);
    sockets.forEach(function(socket) {
      socket.emit('data', data);
    });
  });
  wii.poll();

});

io.sockets.on('connection', function (socket) {
  if(sockets.indexOf(socket) === -1) {
    sockets.push(socket);
    var listener = socketlistener.create(socket, wii);
    socket.on('dicsonnect', function() {
      listener.dispose();
      sockets = sockets.filter(function(s) { return socket !== s; });
    });
  }
});