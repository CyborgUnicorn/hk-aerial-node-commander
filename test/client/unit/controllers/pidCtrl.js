describe('/partials/pid/PidCtrl', function () {

  var scope, ctrl;

  beforeEach(function () {
    module('hk-aerial-commander');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('PidCtrl', {$scope: scope});
    });
  });

  xit('should have tests', function () {
    
  });

});