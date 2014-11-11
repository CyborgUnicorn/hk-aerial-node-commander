describe('/partials/connection/ConnectionCtrl', function () {

  var scope, ctrl, drone;

  beforeEach(function () {
    module('hk-aerial-commander');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      drone = {
        on: sinon.stub(),
        getStatus: sinon.spy(),
        connect: sinon.spy(),
        status: {}
      };
      ctrl = $controller('ConnectionCtrl', {
        $scope: scope,
        drone: drone
      });
    });
  });
  it('listens for drone status', function () {
    expect(drone.on).calledOnce.calledWith('status');
  });
  it('sets status on scope', function () {
    expect(scope.status).to.equal(drone.status);
  });
  it('calls safeApply on scope when status updates', function () {
    sinon.stub(scope, 'safeApply');
    drone.on.withArgs('status').yield({});
    expect(scope.safeApply).calledOnce;
    scope.safeApply.restore();
  });
  describe('getStatus', function () {
    it('calls drone.getStatus', function () {
      ctrl.getStatus();
      expect(drone.getStatus).calledOnce;
    });
  });
  describe('connect', function () {
    it('calls drone.connect with the selected device in devices', function () {
      scope.device = {};
      ctrl.connect();
      expect(drone.connect).calledOnce.calledWith(scope.device);
    });
  });
});