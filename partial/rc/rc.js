angular.module('hk-aerial-commander').controller('RcCtrl', function ($scope, socket, $timeout) {
  'use strict';

  $scope.roll = 1494;
  $scope.pitch = 1500;
  $scope.yaw = 1500;
  $scope.throttle = 1150;
  $scope.aux1 = 1430;
  $scope.aux2 = 1430;
  $scope.throttleOn = true;

  $scope.front = 1150;
  $scope.right = 1150;
  $scope.left = 1150;

  $scope.servosFixed = false;
  $scope.servoOffset = 50;

  $scope.setRawMotor = function () {
    socket.emit('setRawMotor', $scope.front, $scope.right, $scope.left);
  }

  $scope.send = function() {

    var aux1, aux2;

    if($scope.servosFixed) {
      aux1 = ($scope.servoFix.aux1 -100) + 2 * $scope.servoOffset;
      aux2 = ($scope.servoFix.aux2 -100) + 2 * $scope.servoOffset;

      console.log(aux1, aux2);
    } else {
      aux1 = $scope.aux1;
      aux2 = $scope.aux2;
    }

    if(!$scope.rawMotorEnabled) {
      socket.emit('setRawRc',
        $scope.roll,
        $scope.pitch,
        $scope.yaw,
        ($scope.throttleOn ? $scope.throttle : 0),
        aux1,
        aux2,
        0,
        0
      );
    }
  };

  $scope.fixServos = function () {
    $scope.servosFixed = !$scope.servosFixed;
    if($scope.servosFixed) {
      $scope.servoFix = {
        aux1: $scope.aux1,
        aux2: $scope.aux2
      };
      console.log($scope.servoFix);
    }
  }

  var minServo = 1230, maxServo = 1920, step = 20;
  function slide() {
    if(($scope.aux2 >= maxServo && step > 0) || ($scope.aux2 <= minServo && step < 0)) {
      step = -step;
    }
    $scope.aux2 += step;
    $scope.$apply();
  }


  socket.on('rawMotorEnabled', function (data) {
    $scope.rawMotorEnabled = data;
    $scope.safeApply();
  });

  $scope.setRawMotorEnabled = function () {
    socket.emit('setRawMotorEnabled', $scope.rawMotorEnabled);
    if($scope.rawMotorEnabled) {
      setTimeout(function () { $scope.setRawMotor(); }, 50);
    }
  };

  //setInterval($scope.send, 50);

  //$scope.send();
});