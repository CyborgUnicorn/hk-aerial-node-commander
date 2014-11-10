angular.module('hk-aerial-commander').service('drone', function (socket) {

  function Drone() {
    EventEmitter2.call(this);
    this.socketConnected = false;
    this.wiiConnected = false;

    _.bindAll(this);

    socket.on('connect', this.onSocketConnect);
  }

  Drone.prototype = Object.create(EventEmitter2.prototype);
  Drone.prototype.constructor = Drone;

  Drone.prototype.connect = function () {
    return this;
  };

  Drone.prototype.disconnect = function () {
    return this;
  };

  Drone.prototype.arm = function(callback) {
    socket.emit('arm', callback);
  };

  Drone.prototype.disarm = function(callback) {
    socket.emit('disarm', callback);
  };

  Drone.prototype.calibrate = function(callback) {
    socket.emit('setAccCalibration', callback);
  };

  Drone.prototype.setRc = function(roll, pitch, yaw, throttle, callback) {
    roll = 1500 + roll * 450;
    pitch = 1500 + pitch * 450;
    yaw = 1500 + yaw * 450;
    throttle = throttle ? 1150 + throttle * 700 : 0;
    socket.emit('setRawRc', roll, pitch, yaw, throttle, callback);
  };

  Drone.prototype.onStatus = function (err, status) {
    if(err) {
    } else {
      this.wiiConnected = status.connected;
    }
  };

  Drone.prototype.onSocketConnect = function () {
    this.socketConnected = true;
    socket.once('disconnect', this.onSocketDisconnect);
    socket.emit('status', this.onStatus);
    return this;
  };

  Drone.prototype.onSocketDisconnect = function () {
    this.socketConnected = false;
    this.emit('status', this);
    return this;
  };

  Drone.prototype.onWiiConnect = function () {
    return this;
  };

  Drone.prototype.onWiiDisconnect = function () {
    return this;
  };

  return new Drone();
});