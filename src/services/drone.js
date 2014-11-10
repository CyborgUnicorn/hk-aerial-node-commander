angular.module('hk-aerial-commander').service('drone', function (socket) {
  var drone = {
    socketConnected: false,
    connected: false
  };

  socket.on('connect', function () {
    drone.socketConnected = true;

    socket.emit('status', function (err, status) {
      if(err) {

      } else {
        drone.connected = status.connected;
      }
    });
  });

  return drone;
});