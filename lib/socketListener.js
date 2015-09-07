
var multiwii = require('multiwii'),
  motorComputed = require('./motorComputed'),
  rawMotorEnabled = require('./rawMotorEnabled'),
  atomicServo = require('./atomicServo'),
  range = require('./range'),
  setRawMotor = require('./setRawMotor'),
  setRawMotorEnabled = require('./setRawMotorEnabled');

var events = ['rc', 'ident', 'status', 'pid', 'rawMotorEnabled'];
var pollEvents = ['servo', 'motor', 'attitude', 'rawImu', 'motorComputed', 'atomicServo', 'range'];

var SocketListener = exports.SocketListener = function (socket, wii) {
  this.socket = socket;
  this.wii = wii;

  this.list = this.list.bind(this);
  this.connect = this.connect.bind(this);
  this.setRawRc = this.setRawRc.bind(this);
  this.setAccCalibration = this.setAccCalibration.bind(this);
  this.setRawMotor = this.setRawMotor.bind(this);
  this.setPid = this.setPid.bind(this);
  this.setRawMotorEnabled = this.setRawMotorEnabled.bind(this);
  this.status = this.status.bind(this);

  socket.on('list', this.list);
  socket.on('connectWii', this.connect);
  socket.on('status', this.status);
};

SocketListener.prototype.list = function(cb) {
  console.log('list');
  multiwii.list().then(cb);
};

SocketListener.prototype.status = function(cb) {
  var self = this;
  multiwii.list()
    .then(function (devices) {
      var status = {
        connected: self.wii && !!self.wii.port,
        devices: devices
      };
      cb(status);
    });
};

SocketListener.prototype.connect = function(device, cb) {
  console.log('connect', device);
  var self = this;
  var wii = this.wii;

  wii.connect(device).then(function () {
    console.log('connected');

    /*
     *  Custom out messages
     */
    wii.addOutMessage(motorComputed.messageId, 'motorComputed', motorComputed.parse);
    wii.addOutMessage(rawMotorEnabled.messageId, 'rawMotorEnabled', rawMotorEnabled.parse);
    wii.addOutMessage(atomicServo.messageId, 'atomicServo', atomicServo.parse);
    wii.addOutMessage(range.messageId, 'range', range.parse);
    
    /*
     *  Custom in messages
     */
    wii.addInMessage('arm', function () { return {id: 50, data: new Buffer(0)}; });
    wii.addInMessage('disarm', function () { return {id: 51, data: new Buffer(0)}; });
    wii.addInMessage('setRawMotor', setRawMotor);
    wii.addInMessage('setRawMotorEnabled', setRawMotorEnabled);

    pollEvents.concat(events).forEach(function (event) {
      wii.on(event, function (data) { self.socket.emit(event, data); });
    });

    // Command listeners
    self.socket.on('setRawRc', self.setRawRc);
    self.socket.on('setRc', self.setRc);
    self.socket.on('setAccCalibration', self.setAccCalibration);
    self.socket.on('setRawMotor', self.setRawMotor);
    self.socket.on('setRawMotorEnabled', self.setRawMotorEnabled);
    self.socket.on('setPid', self.setPid);

    wii.on('range', function (range) {
      self.range = range;
    });

    wii.read('pid');
    setTimeout(wii.read.bind(wii, 'rawMotorEnabled'), 10);

    self.poll();
    if(cb) { cb(); }
  }).catch(function (err) {
    if(cb) { cb(err); }
    console.error(err);
  });
};

var zeroHeight = 12;
var topHeight = 40;
var hoverThrottle = 1400;
var zeroThrottle = 1100;

SocketListener.prototype.poll = function() {
  var self = this;
  var step = 50, delay = 50;
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
  }, (pollEvents.length +2) * step);
};

SocketListener.prototype.setRc = function(roll, pitch, yaw, throttle) {
  function normalize(val) { return 1500 + (val * 450); }
  throttle = (throttle) ? 0 : 1150 + throttle * 700;
  this.setRawRc(normalize(roll), normalize(pitch), normalize(yaw), throttle);
};

SocketListener.prototype.setRawRc = function(roll, pitch, yaw, throttle, aux1, aux2, aux3, aux4) {
  this.rawRc = {
    roll: roll,
    pitch: pitch,
    yaw: yaw,
    throttle: throttle,
    aux1: aux1,
    aux2: aux2,
    aux3: aux3,
    aux4: aux4
  };
  this.sendRawRc();
};

var zeroRange = 16;
var landingRange = 70;
var zeroThrottle = 1100;
var landingThrottle = 1400;

SocketListener.prototype.sendRawRc = function () {

  var roll = this.rawRc.roll;
  var pitch = this.rawRc.pitch;
  var yaw = this.rawRc.yaw;
  var throttle = this.rawRc;
  var aux1 = this.rawRc.aux1;
  var aux2 = this.rawRc.aux2;
  var aux3 = this.rawRc.aux3;
  var aux4 = this.rawRc.aux4;

  if(range < landingRange) {
    throttle = zeroThrottle + ((landingThrottle - zeroThrottle) * (landingRange - zeroRange));
  }

  var self = this;
  this.wii.setRawRc(roll, pitch, yaw, throttle, aux1, aux2, aux3, aux4)
    .then(function () {
      self.wii.read('rc');
    });
};

SocketListener.prototype.setPid = function(pid) {
  var self = this;
  this.wii.setPid(pid.roll, pid.pitch, pid.yaw, pid.alt, pid.pos, pid.posr, pid.navr, pid.level, pid.mag)
    .then(function () {
      console.log('pid worksed');
      self.wii.read('pid');
    })
    .catch(function (err) {
      console.error('PID');
    });
};

SocketListener.prototype.setRawMotorEnabled = function(bool) {
  var self = this;
  this.wii.setRawMotorEnabled(bool)
    .then(function () {
      self.wii.read('rawMotorEnabled');
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
