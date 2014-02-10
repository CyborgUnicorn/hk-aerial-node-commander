
angular.module('hk-aerial-node-commander', []);

angular.module('hk-aerial-node-commander').service('socket', function() {
  var socket = io.connect('http://localhost');
  socket.on('data', function (data) {
    console.log(data);
    //socket.emit('my other event', { my: 'data' });
  });
  return socket;
});

angular.module('hk-aerial-node-commander').controller('DebugCtrl', function($scope, socket) {

  $scope.send = function() {
    socket.emit('command', $scope.command);
  };
});