angular.module('hk-aerial-commander').controller('RcCtrl', function ($scope, socket, $timeout) {
  'use strict';

  $scope.roll = 1510;
  $scope.pitch = 1510;
  $scope.yaw = 1510;
  $scope.throttle = 1000;
  $scope.aux1 = 1503;
  $scope.aux2 = 1503;
  $scope.throttleOn = true;

  $scope.front = 1150;
  $scope.right = 1150;
  $scope.left = 1150;

  $scope.setRawMotor = function () {
    console.log('setRawMotor', $scope.front, $scope.right, $scope.left);
    socket.emit('setRawMotor', $scope.front, $scope.right, $scope.left);
  }

  $scope.send = function() {
    socket.emit('setRawRc',
      $scope.roll,
      $scope.pitch,
      $scope.yaw,
      ($scope.throttleOn ? $scope.throttle : 0),
      $scope.aux1,
      $scope.aux2,
      0,
      0
    );
  };

  //setInterval($scope.send, 1000);

  //$scope.send();
});