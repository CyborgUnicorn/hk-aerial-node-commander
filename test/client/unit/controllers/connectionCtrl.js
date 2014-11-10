describe('/partials/connection/ConnectionCtrl', function () {

  var scope, ctrl;

  beforeEach(function () {
    module('hk-aerial-commander');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('ConnectionCtrl', {$scope: scope});
    });
  });

  xit('should have tests', function () {
    
  });

});