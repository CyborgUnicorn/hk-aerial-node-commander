describe('/services/drone', function () {

  var drone, socket;

  beforeEach(function () {
    socket = {
      on: sinon.stub(),
      once: sinon.stub(),
      off: sinon.stub(),
      emit: sinon.stub()
    };
    module('hk-aerial-commander', function ($provide) {
      $provide.value('socket', socket);
    });
    inject(function (_drone_) {
      drone = _drone_;
    });
  });
  it('sets socketConnected to false', function () {
    expect(drone.status.socketConnected).to.be.false;
  });
  it('sets droneConnected to false', function () {
    expect(drone.status.droneConnected).to.be.false;
  });
  it('listens for connect event', function () {
    expect(socket.on).calledOnce.calledWith('connect');
  });
  it('sets default status values', function () {
    expect(drone.status).to.eql({
      socketConnected: false,
      droneConnected: false,
      devices: []
    });
  });
  describe('on connect', function () {
    beforeEach(function () {
      socket.on.withArgs('connect').yield();
    });
    it('sets socketConnected to true', function () {
      expect(drone.status.socketConnected).to.be.true;
    });
    it('emits `status` on socket', function () {
      expect(socket.emit).calledOnce.calledWith('status');
    });
    it('sets status to value in callback', function () {
      socket.emit.withArgs('status').yield({connected: true, devices: [1,2]});
      expect(drone.status.droneConnected).to.be.true;
      expect(drone.status.devices).to.eql([1,2]);
    });
    it('listens for disconnect', function () {
      expect(socket.once.withArgs('disconnect')).calledOnce;
    });
    it('updates and emits status on disconnect', function () {
      var listener = sinon.spy();
      drone.on('status', listener);
      socket.once.withArgs('disconnect').yield();
      expect(listener).calledOnce.calledWith(drone.status);
      expect(drone.status.socketConnected).to.be.false;
    });
    describe('arm', function () {
      it('emits arm', function () {
        var listener = sinon.spy();
        drone.arm(listener);
        expect(socket.emit.withArgs('arm'), 'emit').calledOnce;
        socket.emit.withArgs('arm').yield();
        expect(listener, 'callback').calledOnce;
      });
    });
    describe('disarm', function () {
      it('emits disarm', function () {
        var listener = sinon.spy();
        drone.disarm(listener);
        expect(socket.emit.withArgs('disarm'), 'emit').calledOnce;
        socket.emit.withArgs('disarm').yield();
        expect(listener, 'callback').calledOnce;
      });
    });
    describe('setRc', function () {
      it('emits setRawRc', function () {
        var listener = sinon.spy();
        drone.setRc(0, 1, -1, 0.5, listener);
        expect(socket.emit.withArgs('setRawRc'), 'emit').calledOnce.calledWith('setRawRc', 1500, 1950, 1050, 1500);
        socket.emit.withArgs('setRawRc').yield();
        expect(listener, 'callback').calledOnce;
      });
    });
    describe('calibrate', function () {
      it('emits setAccCalibration', function () {
        var listener = sinon.spy();
        drone.calibrate(listener);
        expect(socket.emit.withArgs('setAccCalibration'), 'emit').calledOnce;
        socket.emit.withArgs('setAccCalibration').yield();
        expect(listener, 'callback').calledOnce;
      });
    });
    describe('on disconnect', function () {
      beforeEach(function () {
        socket.once.withArgs('disconnect').yield();
      });
    });
    describe('events', function () {
      var listener;
      beforeEach(function () {
        listener = sinon.spy();
      });
      it('sets default values', function () {
        expect(drone.rc).to.eql({roll: 0, pitch: 0, yaw: 0, throttle: 0});
        expect(drone.motors).to.eql({front: 0, left: 0, right: 0, servos: 0});
        expect(drone.attitude).to.eql({roll: 0, pitch: 0, heading: 0});
        expect(drone.accelerometers).to.eql({acc: {roll: 0, pitch: 0, z: 0}, gyro: {roll: 0, pitch: 0, yaw: 0}});
        expect(drone.pid).to.eql({
          roll: {p: 0, i: 0, d: 0},
          pitch: {p: 0, i: 0, d: 0},
          yaw: {p: 0, i: 0, d: 0},
          alt: {p: 0, i: 0, d: 0},
          pos: {p: 0, i: 0, d: 0},
          posr: {p: 0, i: 0, d: 0},
          navr: {p: 0, i: 0, d: 0},
          level: {p: 0, i: 0, d: 0},
          mag: {p: 0, i: 0, d: 0}
        });
      });
      it('updates and emits status on `rc`', function () {
        drone.on('rc', listener);
        socket.on.withArgs('rc').yield({roll: 1500, pitch: 1050, yaw: 1950, throttle: 1850});
        expect(drone.rc).to.eql({
          roll: 0,
          pitch: -1,
          yaw: 1,
          throttle: 1
        });
        expect(listener).calledOnce;
      });
      it('updates and emits status on `motor`', function () {
        drone.on('motors', listener);
        socket.on.withArgs('motor').yield([1500, 1050, 1850, 0, 0, 0, 0, 0]);
        expect(drone.motors).to.eql({
          front: 0.5,
          left: 0,
          right: 1,
          servos: 0
        });
        expect(listener).calledOnce;
      });
      it('updates and emits status on `servo`', function () {
        drone.on('motors', listener);
        socket.on.withArgs('servo').yield([0, 0, 0, 0, 0, 1500, 0, 0]);
        expect(drone.motors).to.eql({
          front: 0,
          left: 0,
          right: 0,
          servos: 0.5
        });
        expect(listener).calledOnce;
      });
      it('updates and emits status on `attitude`', function () {
        drone.on('attitude', listener);
        socket.on.withArgs('attitude').yield({angles: [191, 62], heading: 25});
        expect(drone.attitude).to.eql({
          roll: 191,
          pitch: 62,
          heading: 25
        });
        expect(listener).calledOnce;
      });
      it('updates and emits status on `rawImu`', function () {
        drone.on('accelerometers', listener);
        socket.on.withArgs('rawImu').yield({accSmooth: [-315, 112, 418], gyroData: [294, -164, 303]});
        expect(drone.accelerometers).to.eql({
          acc: {
            roll: -315,
            pitch: 112,
            z: 418
          },
          gyro: {
            roll: 294,
            pitch: -164,
            yaw: 303
          }
        });
        expect(listener).calledOnce;
      });
      it('updates and emits status on `pid`', function () {
        drone.on('pid', listener);
        socket.on.withArgs('pid').yield({
          roll: {p: 1, i: 2, d: 3},
          pitch: {p: 4, i: 5, d: 6},
          yaw: {p: 7, i: 8, d: 9},
          alt: {p: 10, i: 11, d: 12},
          pos: {p: 13, i: 14, d: 15},
          posr: {p: 16, i: 17, d: 18},
          navr: {p: 19, i: 20, d: 21},
          level: {p: 22, i: 23, d: 24},
          mag: {p: 25, i: 26, d: 27}
        });
        expect(drone.pid).to.eql({
          roll: {p: 1, i: 2, d: 3},
          pitch: {p: 4, i: 5, d: 6},
          yaw: {p: 7, i: 8, d: 9},
          alt: {p: 10, i: 11, d: 12},
          pos: {p: 13, i: 14, d: 15},
          posr: {p: 16, i: 17, d: 18},
          navr: {p: 19, i: 20, d: 21},
          level: {p: 22, i: 23, d: 24},
          mag: {p: 25, i: 26, d: 27}
        });
        expect(listener).called;
      });
    });
  });
  describe('getStatus', function () {
    it('emits a `status` event on the socket', function () {
      drone.getStatus();
      expect(socket.emit.withArgs('status')).calledOnce;
    });
  });
  describe('connect', function () {
    it('emits a `connect` event on the socket with the passed in device', function () {
      var device = {};
      drone.connect(device);
      expect(socket.emit.withArgs('connect', device)).calledOnce;
    });
  });
});