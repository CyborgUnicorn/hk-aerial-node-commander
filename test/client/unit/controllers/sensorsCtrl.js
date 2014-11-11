describe('/partials/sensors/SensorsCtrl', function () {

  var scope, ctrl;

  beforeEach(function () {
    module('hk-aerial-commander');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('SensorsCtrl', {$scope: scope});
    });
  });

  xit('should have tests', function () {
    
  });

});