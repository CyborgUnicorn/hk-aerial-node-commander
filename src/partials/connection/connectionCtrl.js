angular.module('hk-aerial-commander').controller('ConnectionCtrl', function ($scope, drone) {
  $scope.status = drone.status;
  
  this.getStatus = function () {
    drone.getStatus();
  };

  this.connect = function () {
    drone.connect($scope.device);
  };

  drone.on('status', function (status) {
    $scope.safeApply();
  });
});