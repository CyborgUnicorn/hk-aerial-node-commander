
angular.module('hk-aerial-node-commander', []);

angular.module('hk-aerial-node-commander').service('socket', function() {
  var socket = io.connect('http://localhost');
  return socket;
});

angular.module('hk-aerial-node-commander').controller('DebugCtrl', function($scope, socket) {

  socket.on('data', function (data) {
    Object.keys(data).forEach(function (key) {
      $scope[key] = data[key];
    });
  });

});

angular.module('hk-aerial-node-commander').controller('RcCtrl', function($scope, socket, $timeout) {

  $scope.roll = 1510;
  $scope.pitch = 1510;
  $scope.yaw = 1510;
  $scope.throttle = 1150;
  $scope.aux1 = 1503;
  $scope.aux2 = 1503;
  $scope.throttleOn = true;

  $scope.send = function() {
    socket.emit('send.rc', [
      $scope.roll,
      $scope.pitch,
      $scope.yaw,
      ($scope.throttleOn ? $scope.throttle : 0),
      $scope.aux1,
      $scope.aux2,
      0,
      0
    ]);

    $timeout($scope.send, 200);
  };

  $scope.send();

});