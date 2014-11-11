angular.module('hk-aerial-commander').controller('AttitudeCtrl', function ($scope, drone) {
  $scope.attitude = drone.attitude;
  $scope.accelerometers = drone.accelerometers;

  drone.on('attitude', function () {
    $scope.safeApply();
  });
  drone.on('accelerometers', function () {
    $scope.safeApply();
  });
});