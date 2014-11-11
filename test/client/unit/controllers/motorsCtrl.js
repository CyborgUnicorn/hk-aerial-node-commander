describe('/partials/motors/MotorsCtrl', function () {

  var scope, ctrl, drone;

  beforeEach(function () {
    module('hk-aerial-commander');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      drone = {
        on: sinon.stub(),
        motors: {

        }
      };
      ctrl = $controller('MotorsCtrl', {
        $scope: scope,
        drone: drone
      });
    });
  });
  it('listens for `motors` events', function () {
    expect(drone.on).calledOnce.calledWith('motors');
  });
  it('sets motor values on scope', function () {
    expect(scope.motors).to.equal(drone.motors);
  });
  it('calls safeApply on `motors` event', function () {
    sinon.stub(scope, 'safeApply');
    drone.on.withArgs('motors').yield(drone.motors);
    expect(scope.safeApply).calledOnce;
    scope.safeApply.restore();
  });
});