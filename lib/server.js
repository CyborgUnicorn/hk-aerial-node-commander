var connect = require('connect'),
  http = require('http'),
  multiwii = require('multiwii'),
  Wii = multiwii.Wii,
  socketlistener = require('./socketlistener'),
  dualShockListener = require('./dualShockListener');

module.exports = function (cb) {
  var app = connect()
    .use(connect.static(process.cwd()))
    .use(connect.static(process.cwd() + '/src'));

  var server = http.createServer(app).listen(3000);

  var io = require('socket.io').listen(server);
  var sockets = [];

  var wii = new Wii();

  //var DualShock = dualShockListener.DualShock;
  //var controller = new DualShock();
  //controller.connect(wii);

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

  cb();
};