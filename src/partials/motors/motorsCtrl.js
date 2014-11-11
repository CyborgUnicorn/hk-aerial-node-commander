angular.module('hk-aerial-commander').controller('MotorsCtrl', function ($scope, drone) {
  $scope.motors = drone.motors;
  drone.on('motors', function () {
    $scope.safeApply();
  });
});