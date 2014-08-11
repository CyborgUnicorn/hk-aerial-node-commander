
var dualShock = require('dualshock-controller');

function DualShock() {

  this.left = { x: 128, y: 128 };
  this.right = { x: 128, y: 128 };
  this.r2 = 0;

  this.ctrl = dualShock({
    config: 'dualShock3',
    acceleratorSmoothing: true,
    analogStickSmoothing: true
  });

  this.onLeftStick = this.onLeftStick.bind(this);
  this.onRightStick = this.onRightStick.bind(this);
  this.onR2 = this.onR2.bind(this);
  this.onCircle = this.onCircle.bind(this);

  this.startListening();
}

DualShock.prototype.connect = function (wii) {
  console.log('connect');
  this.ctrl.connect();
  this.wii = wii;
};

DualShock.prototype.startListening = function() {
  this.ctrl.on('connected', function (data) {
    console.log('connected', data);
  });
  this.ctrl.on('connection:change', function (data) {
    console.log('connection:change', data);
  });
  this.ctrl.on('left:move', this.onLeftStick);
  this.ctrl.on('right:move', this.onRightStick);
  this.ctrl.on('r2:analog', this.onR2);
  this.ctrl.on('circle:press', this.onCircle);
};

DualShock.prototype.onCircle = function() {
  console.log('calibrated');
  if(this.wii.port) {
    this.wii.setAccCalibration();
  } else {
    console.log('NOT');
  }
};

DualShock.prototype.onLeftStick = function(data) {
  this.left = data;
  this.send();
};

DualShock.prototype.onRightStick = function(data) {
  this.right = data;
  this.send();
};

DualShock.prototype.onR2 = function(data) {
  this.r2 = data;
  this.send();
};

DualShock.prototype.send = function() {
  var roll = Math.round(1020 + 980 * this.left.x / 255);
  var pitch = Math.round(1020 + 980 * (255 - this.left.y) / 255);
  var yaw = Math.round(1020 + 980 * 128 / 255);
  var throttle = Math.round(1000 + 1000 * this.r2 / 255);
  var aux1 = Math.round(1006 + 1000 * (255 - this.right.x) / 255);
  var aux2 = Math.round(1006 + 1000 * (255 - this.right.x) / 255);

  console.log('setRawRc', roll, pitch, yaw, throttle, aux1, aux2, 0, 0);
  if(this.wii.port) {
    this.wii.setRawRc(roll, pitch, yaw, throttle, aux1, aux2, 0, 0);
  } else {
    console.log('NOT');
  }
};

exports.DualShock = DualShock;