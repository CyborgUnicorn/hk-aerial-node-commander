describe('/partials/model3D/Model3DCtrl', function () {

  var scope, ctrl;

  beforeEach(function () {
    module('hk-aerial-commander');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('Model3DCtrl', {$scope: scope});
    });
  });

  xit('should have tests', function () {
    
  });

});