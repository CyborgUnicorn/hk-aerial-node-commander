describe('/partials/connection/ConnectionCtrl', function () {

  var scope, ctrl, drone;

  beforeEach(function () {
    module('hk-aerial-commander');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      drone = {
        on: sinon.stub()
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

});