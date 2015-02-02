angular.module('hk-aerial-commander').service('socket', function () {
  var socket = io.connect();

  return {
    on: socket.on.bind(socket),
    once: socket.on.bind(socket),
    off: socket.removeListener.bind(socket),
    emit: socket.emit.bind(socket)
  };
});
