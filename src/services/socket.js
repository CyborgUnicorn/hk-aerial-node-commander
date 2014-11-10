angular.module('hk-aerial-commander').service('socket', function () {
  var socket = io.connect('http://localhost');

  return {
    on: socket.on.bind(socket),
    emit: socket.emit.bind(socket)
  };
});