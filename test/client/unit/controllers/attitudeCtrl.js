describe('/partials/attitude/AttitudeCtrl', function () {

  var scope, ctrl, drone;

  beforeEach(function () {
    module('hk-aerial-commander');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      drone = {
        on: sinon.stub(),
        attitude: {},
        accelerometers: {}
      };
      ctrl = $controller('AttitudeCtrl', {
        $scope: scope,
        drone: drone
      });
    });
  });
  it('should listen for `attitude` events', function () {
    expect(drone.on.withArgs('attitude')).calledOnce;
  });
  it('should listen for `accelerometers` events', function () {
    expect(drone.on.withArgs('accelerometers')).calledOnce;
  });
  it('should set drone.attitude on scope', function () {
    expect(scope.attitude).to.equal(drone.attitude);
  });
  it('should set drone.accelerometers on scope', function () {
    expect(scope.accelerometers).to.equal(drone.accelerometers);
  });
  it('should call safeApply on scope on `attitude` and `accelerometers` events', function () {
    sinon.stub(scope, 'safeApply');
    drone.on.withArgs('attitude').yield(drone.attitude);
    expect(scope.safeApply).calledOnce;
    drone.on.withArgs('accelerometers').yield(drone.accelerometers);
    expect(scope.safeApply).calledTwice;
    scope.safeApply.restore();
  });
});