describe('DebugCtrl', function () {

  var scope, ctrl;

  beforeEach(function () {
    module('hk-aerial-commander');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('DebugCtrl', {$scope: scope});
    });
  });

  xit('should have tests', function () {
    
  });

});