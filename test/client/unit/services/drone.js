describe('/services/drone', function () {

  var drone, socket;

  beforeEach(function () {
    socket = {
      on: sinon.stub(),
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
  it('sets connected to false', function () {
    expect(drone.connected).to.be.false;
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
      expect(drone.connected).to.be.true;
    });
  });
});