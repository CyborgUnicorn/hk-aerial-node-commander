var serialport = require('serialport')
  , SerialPort = serialport.SerialPort
  , sys = require('util')
  , port;

var Wii = require('./src/wii').Wii;
var wii = new Wii();
wii.connect(function() {
 // setInterval(send, 500);
  wii.send([200, 0x7e, 0x04, 0x7e, 0x04, 0xd0, 0x07, 0x00, 0x00, 0, 0, 0, 0, 0, 0, 0, 0]);
setTimeout(function() {  
  wii.send([200, 0x7e, 0x04, 0x7e, 0x04, 0xd0, 0x07, 0x7e, 0x04, 0, 0, 0, 0, 0, 0, 0, 0]);
}, 100);
});

var times = 0;
var messages = [100, 101, 105, 115];
/*function send() {
  var message = messages[(times++)%messages.length];
  console.log('message: ' + message);
  wii.send([message]);
}*/
