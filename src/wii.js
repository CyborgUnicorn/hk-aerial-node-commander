
var serialport = require('serialport')
  , SerialPort = serialport.SerialPort
  , sys = require('util')
  , port;
var manufacturer = 'Arduino LLC';

var Wii = exports.Wii = function Wii() {
  this.parsers = {
    '100': require('./parsers/ident'),
    '101': require('./parsers/status'),
    '105': require('./parsers/rc'),
    '115': require('./parsers/motorpins')
  };
};

Wii.prototype.connect = function(callback) {
  var self = this;

  serialport.list(function (err, ports) {
    ports.forEach(function(port) {
      if(manufacturer === port.manufacturer) {
        self.port = new SerialPort(port.comName, {
          baudrate: 115200,
          databits: 8,
          stopbits: 1,
          parity: 'none',
          parser: serialport.parsers.raw
        });

        self.port.on('error', function(info) { self.onError(info); });
        self.port.on('open', function() {
          self.port.on('data', function(message) { self.onData(message); });
          callback(self);
        });
        
        return;
      }
    });
  });
};

Wii.prototype.send = function(msg, success, fail) {
  var arr = [0x24, 0x4D, 0x3C];
  arr.push(msg.length);
  arr = arr.concat(msg);
  var checksum = arr.slice(3).reduce(function(tot, cur) { return tot ^ cur; }, 0);
  arr.push(checksum);

  arr.push(13);
  arr.push(37);
  // yeah... cram it in there!

  var port = this.port;

  port.write(new Buffer(arr), function(err, result) {
    if(err && fail) fail(err);
    else if(!err && success) success(result);
  });
};

Wii.prototype.onError = function(info) {
  console.error(info);
};

Wii.prototype.onData = function(message) {
  var len = message[3]
  var type = message[4];
  var data = message.slice(5, 5+len);
  var parser = this.parsers[type] || require('./parsers/raw');
  var result = parser.parse(data);
  console.log(type, result);
};