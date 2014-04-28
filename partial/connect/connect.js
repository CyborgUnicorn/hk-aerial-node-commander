angular.module('hk-aerial-commander').controller('ConnectCtrl', function ($scope, socket) {
  'use strict';
  
  $scope.getList = function () {
    socket.emit('list', function (devices) {
      console.log(arguments);
      $scope.devices = devices;
      $scope.safeApply();
    });
  };

  $scope.connect = function () {
    console.log('connect', $scope.device);
    socket.emit('connect', $scope.device);
  };

  $scope.calibrate = function () {
    socket.emit('setAccCalibration');
  };
});