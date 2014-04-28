angular.module('hk-aerial-commander').service('socket', function () {
  'use strict';
  /*var io = {
    connect: function() {
      return {
        on: function() {},
        emit: function() {}
      };
    }
  };*/

  var socket = io.connect('http://localhost');
  return socket;
});