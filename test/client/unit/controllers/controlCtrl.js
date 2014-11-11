describe('/partials/control/ControlCtrl', function () {

  var scope, ctrl;

  beforeEach(function () {
    module('hk-aerial-commander');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('ControlCtrl', {$scope: scope});
    });
  });

  xit('should have tests', function () {
    
  });

});