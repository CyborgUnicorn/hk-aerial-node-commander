angular.module('hk-aerial-commander').service('drone', function (socket) {

  function Drone() {
    EventEmitter2.call(this);
    this.status = {
      socketConnected: false,
      droneConnected: false,
      devices: []
    };

    this.rc = {roll: 0, pitch: 0, yaw: 0, throttle: 0};
    this.motors = {front: 0, left: 0, right: 0, servos: 0};
    this.attitude = {roll: 0, pitch: 0, heading: 0};
    this.accelerometers = {acc: {roll: 0, pitch: 0, z: 0}, gyro: {roll: 0, pitch: 0, yaw: 0}};
    this.pid = {
      roll: {p: 0, i: 0, d: 0},
      pitch: {p: 0, i: 0, d: 0},
      yaw: {p: 0, i: 0, d: 0},
      alt: {p: 0, i: 0, d: 0},
      pos: {p: 0, i: 0, d: 0},
      posr: {p: 0, i: 0, d: 0},
      navr: {p: 0, i: 0, d: 0},
      level: {p: 0, i: 0, d: 0},
      mag: {p: 0, i: 0, d: 0}
    };

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

  Drone.prototype.onStatus = function (status) {
    this.status.droneConnected = status.connected;
    this.status.devices = status.devices;
    this.emit('status', this.status);
  };

  Drone.prototype.onSocketConnect = function () {
    this.status.socketConnected = true;
    socket.once('disconnect', this.onSocketDisconnect);
    socket.on('rc', this.onRc);
    socket.on('motor', this.onMotor);
    socket.on('servo', this.onServo);
    socket.on('attitude', this.onAttitude);
    socket.on('rawImu', this.onImu);
    socket.on('pid', this.onPid);

    socket.emit('status', this.onStatus);
    return this;
  };

  Drone.prototype.onSocketDisconnect = function () {
    this.status.socketConnected = false;
    socket.off('rc', this.onRc);
    socket.off('motor', this.onMotor);
    socket.off('servo', this.onServo);
    socket.off('attitude', this.onAttitude);
    socket.off('rawImu', this.onImu);
    socket.off('pid', this.onPid);
    this.emit('status', this.status);
    return this;
  };

  Drone.prototype.onRc = function(rc) {
    this.rc.roll = (rc.roll - 1500) / 450;
    this.rc.pitch = (rc.pitch - 1500) / 450;
    this.rc.yaw = (rc.yaw - 1500) / 450;
    this.rc.throttle = Math.max((rc.throttle - 1150) / 700, 0);
    this.emit('rc', this.rc);
  };

  Drone.prototype.onMotor = function(motors) {
    this.motors.front = Math.max((motors[0] - 1150) / 700, 0);
    this.motors.left = Math.max((motors[1] - 1150) / 700, 0);
    this.motors.right = Math.max((motors[2] - 1150) / 700, 0);
    this.emit('motors', this.motors);
  };

  Drone.prototype.onServo = function(servos) {
    this.motors.servos = Math.max((servos[5] - 1150) / 700, 0);
    this.emit('motors', this.motors);
  };

  Drone.prototype.onAttitude = function(attitude) {
    this.attitude.roll = attitude.angles[0];
    this.attitude.pitch = attitude.angles[1];
    this.attitude.heading = attitude.heading;
    this.emit('attitude', this.attitude);
  };

  Drone.prototype.onImu = function(imu) {
    this.accelerometers.acc.roll = imu.accSmooth[0];
    this.accelerometers.acc.pitch = imu.accSmooth[1];
    this.accelerometers.acc.z = imu.accSmooth[2];
    this.accelerometers.gyro.roll = imu.gyroData[0];
    this.accelerometers.gyro.pitch = imu.gyroData[1];
    this.accelerometers.gyro.yaw = imu.gyroData[2];
    this.emit('accelerometers', this.accelerometers);
  };

  Drone.prototype.onPid = function(pid) {
    this.pid = pid;
    this.emit('pid', this.pid);
  };

  Drone.prototype.onWiiConnect = function () {
    return this;
  };

  Drone.prototype.onWiiDisconnect = function () {
    return this;
  };

  return new Drone();
});