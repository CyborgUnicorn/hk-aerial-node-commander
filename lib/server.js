var connect = require('connect'),
  http = require('http'),
  multiwii = require('multiwii'),
  Wii = multiwii.Wii,
  socketlistener = require('./socketListener'),
  dualShockListener = require('./dualShockListener');

/*function cors(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, *');

        // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    };
};*/

module.exports = function (cb) {
  var app = connect()
    //.use(cors)
    .use(connect.static(process.cwd()))
    .use(connect.static(process.cwd() + '/src'));

  var server = http.createServer(app).listen(3000);

  var io = require('socket.io').listen(server, {origins:'*'});
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

module.exports(function() {});
