angular.module('hk-aerial-commander').controller('DebugCtrl', function ($scope, socket) {
  'use strict';

  socket.on('data', function (data) {
    Object.keys(data).forEach(function (key) {
      $scope[key] = data[key];
    });
  });

});