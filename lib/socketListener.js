
var multiwii = require('multiwii'),
  motorComputed = require('./motor-computed'),
  setRawMotor = require('./setRawMotor');

var events = ['rc', 'ident', 'status'];
var pollEvents = ['servo', 'motor', 'attitude', 'rawImu', 'motor-computed'];

var SocketListener = exports.SocketListener = function (socket, wii) {
  this.socket = socket;
  this.wii = wii;

  this.list = this.list.bind(this);
  this.connect = this.connect.bind(this);
  this.setRawRc = this.setRawRc.bind(this);
  this.setAccCalibration = this.setAccCalibration.bind(this);
  this.setRawMotor = this.setRawMotor.bind(this);

  socket.on('list', this.list);
  socket.on('connect', this.connect);
};

SocketListener.prototype.list = function(cb) {
  multiwii.list().then(cb);
};

SocketListener.prototype.connect = function(device, cb) {
  console.log('connect', device);
  var self = this;
  this.wii.connect(device).then(function () {
    console.log('connected');

    self.wii.addOutMessage(motorComputed.messageId, 'motor-computed', motorComputed.parse);
    self.wii.addInMessage('setRawMotor', setRawMotor);

    pollEvents.concat(events).forEach(function (event) {
      self.wii.on(event, function (data) { self.socket.emit(event, data); });
    });

    // Command listeners
    self.socket.on('setRawRc', self.setRawRc);
    self.socket.on('setAccCalibration', self.setAccCalibration);
    self.socket.on('setRawMotor', self.setRawMotor);

    self.poll();
    if(cb) { cb(); }
  }).catch(function (err) {
    if(cb) { cb(err); }
    console.error(err);
  });
};

SocketListener.prototype.poll = function() {
  var self = this;
  var step = 50, delay = 0;
  pollEvents.forEach(function (event) {
    setTimeout(function () {
      if(self.wii.connected) {
        self.wii.read(event);
        delay += step;
      }
    }, delay);
  });

  setTimeout(function () {
    if(self.wii.connected) {
      self.poll();
    }
  }, (pollEvents.length +1) * step);
};

SocketListener.prototype.setRawRc = function(roll, pitch, yaw, throttle, aux1, aux2, aux3, aux4) {
  var self = this;
  this.wii.setRawRc(roll, pitch, yaw, throttle, aux1, aux2, aux3, aux4)
    .then(function () {
      self.wii.read('rc');
    });
};

SocketListener.prototype.setRawMotor = function(front, right, left) {
  console.log('begin set raw motor');
  var self = this;
  this.wii.setRawMotor(front, right, left)
    .then(function () {
      console.log('set raw motor');
    })
    .catch(function (err) {
      console.log('failed to set raw motor');
    });
};

SocketListener.prototype.setAccCalibration = function() {
  var self = this;
  this.wii.setAccCalibration();
};

SocketListener.prototype.read = function (event) {
  var self = this;
  if(events.indexOf(event) === -1 && pollEvents.indexOf(event) === -1) {
    this.wii.once(event, function (data) { self.socket.emit(event, data); });
  }
  this.wii.read(event);
};

SocketListener.prototype.dispose = function() {
  this.socket.removeAllListeners();
  this.wii.dispose();
};

exports.create = function (socket, wii) {
  return new SocketListener(socket, wii);
};