angular.module('hk-aerial-commander').controller('ConnectionCtrl', function ($scope, drone) {
  drone.on('status', function (status) {

  });
});