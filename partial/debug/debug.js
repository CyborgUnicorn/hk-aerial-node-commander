angular.module('hk-aerial-commander').controller('DebugCtrl', function ($scope, socket) {
  'use strict';

  socket.on('rc', function (data) {
    $scope.rc = data;
    $scope.safeApply();
  });

  socket.on('motor', function (data) {
    $scope.motor = data;
    $scope.safeApply();
  });

  socket.on('motor-computed', function (data) {
    $scope.motorComputed = data;
    $scope.safeApply();
  });

  socket.on('servo', function (data) {
    $scope.servo = data;
    $scope.safeApply();
  });

  socket.on('attitude', function (data) {
    $scope.attitude = data;
    $scope.safeApply();
  });

  socket.on('rawImu', function (data) {
    $scope.rawImu = data;
    $scope.safeApply();
  });

});