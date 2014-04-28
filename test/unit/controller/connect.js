describe('ConnectCtrl', function () {

  var scope, ctrl;

  beforeEach(function () {
    module('hk-aerial-commander');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('ConnectCtrl', {$scope: scope});
    });
  });

  xit('should have tests', function () {
    
  });

});