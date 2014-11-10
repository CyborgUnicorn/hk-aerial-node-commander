describe('/services/drone', function () {

  var drone, socket;

  beforeEach(function () {
    socket = {
      on: sinon.stub(),
      once: sinon.stub(),
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
    expect(drone.socketConnected).to.be.false;
  });
  it('sets wiiConnected to false', function () {
    expect(drone.wiiConnected).to.be.false;
  });
  it('listens for connect event', function () {
    expect(socket.on).calledOnce.calledWith('connect');
  });
  describe('on connect', function () {
    beforeEach(function () {
      socket.on.withArgs('connect').yield();
    });
    it('sets socketConnected to true', function () {
      expect(drone.socketConnected).to.be.true;
    });
    it('emits status', function () {
      expect(socket.emit).calledOnce.calledWith('status');
    });
    it('sets status to value in callback', function () {
      socket.emit.withArgs('status').yield(null, {connected: true});
      expect(drone.wiiConnected).to.be.true;
    });
    it('listens for disconnect', function () {
      expect(socket.once.withArgs('disconnect')).calledOnce;
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
  });
  describe('events', function () {
    it('sets default values', function () {
      expect(drone.rc).to.eql({roll: 0, pitch: 0, yaw: 0, throttle: 0});
    });
    it('updates and emits status on `rc`', function () {

    });
  });
});