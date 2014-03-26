angular.module('hk-aerial-commander').service('socket', function () {
  'use strict';

  var socket = io.connect('http://localhost');
  return socket;
});