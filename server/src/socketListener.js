
var SocketListener = exports.SocketListener = function (socket, wii) {
  this.socket = socket;
  this.wii = wii;

  socket.on('send.rc', this.onRc.bind(this));
};

SocketListener.prototype.onRc = function(values) {
  //console.log('sendRcValues', values);
  this.wii.sendRcValues.apply(this.wii, values);
};

SocketListener.prototype.dispose = function() {
  
};

exports.create = function (socket, wii) {
  return new SocketListener(socket, wii);
};