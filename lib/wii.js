
var serialport = require('serialport'),
  SerialPort = serialport.SerialPort,
  util = require('util'),
  EventEmitter = require('events').EventEmitter,
  port;
var manufacturer = 'Arduino LLC';

var Wii = exports.Wii = function Wii() {
  this.parsers = {
    '100': require('./parsers/ident'),
    '101': require('./parsers/status'),
    '105': require('./parsers/rc'),
    '115': require('./parsers/motorpins'),
    '12': require('./parsers/atomicServo')
  };
};

util.inherits(Wii, EventEmitter);

Wii.prototype.connect = function(callback) {
  var self = this;

  serialport.list(function (err, ports) {
    console.log('Searching for device');
    ports.forEach(function(port) {
      if(manufacturer === port.manufacturer) {
        console.log('Found device. Connecting to NanoWii');
        self.port = new SerialPort(port.comName, {
          baudrate: 115200,
          databits: 8,
          stopbits: 1,
          parity: 'none',
          parser: serialport.parsers.raw
        });

        self.port.on('error', function(info) { self.onError(info); });
        self.port.on('open', function() {
          console.log('Connected');
          self.port.on('data', function(message) { self.onData(message); });
          callback(self);
        });
        
        return;
      }
    });
    if(!self.port) {
      console.error('Could not find device');
    }
  });
};

Wii.prototype.send = function(msg, data, success, fail) {
  if(this.port) {
    var arr = [0x24, 0x4D, 0x3C];
    arr.push(data ? data.length + 6 : 0);
    arr.push(msg);
    if(data) {
      arr = arr.concat(data);
    }
    var checksum = arr.slice(3).reduce(function(tot, cur) { return tot ^ cur; }, 0);
    arr.push(checksum);

    var port = this.port;

    this.trace(arr);

    port.write(new Buffer(arr), function(err, result) {
      if(err && fail) {
        fail(err);
      } else if(!err && success) {
        success(result);
      }
    });
  }
};

Wii.prototype.onError = function(info) {
  console.error(info);
  this.port = undefined;
  this.emit('error', info);
};

Wii.prototype.onData = function(message) {
  var len = message[3];
  var type = message[4];
  var data = message.slice(5, 5+len);
  var parser = this.parsers[type] || require('./parsers/raw');
  var result = parser.parse(data);
  this.emit('data', result);
};

Wii.prototype.sendRcValues = function(roll, pitch, yaw, throttle, aux1, aux2) {
//  console.log('send rc', roll, pitch, yaw, throttle, aux1, aux2);
  var msg = 200;
  var data = [
    roll & 0xff, roll >> 8,
    pitch & 0xff, pitch >> 8,
    yaw & 0xff, yaw >> 8, // yaw
    throttle & 0xff, throttle >> 8,
    aux1 & 0xff, aux1 >> 8,
    aux2 & 0xff, aux2 >> 8,
    0, 0, // aux 3
    0, 0  // aux 4
    ];
  this.send(msg, data);
  this.readRcValues();
};

Wii.prototype.readRcValues = function() {
  var msg = 105;
  this.send(105);
  this.send(105);
};

Wii.prototype.readAtomicServo = function() {
  var msg = 12;
  this.send(12);
  this.send(12);
};

Wii.prototype.poll = function() {
  var self = this;
  //setTimeout(function() { self.sendRcValues(1500, 1500, 900, 1500, 2000, 1000); }, 0);
  //setTimeout(function() { self.readRcValues(); }, 100);
  //setTimeout(function() { self.readAtomicServo(); }, 100);
  //setTimeout(function() { self.poll(); }, 300);
};

Wii.prototype.trace = function(msg) {
  //console.log('Writing', msg.map(function(byte) { return byte.toString(16); }).join(','));
};
