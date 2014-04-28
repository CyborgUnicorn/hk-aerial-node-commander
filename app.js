var multiwii = require('multiwii'),
  Wii = multiwii.Wii,
  sys = require('util'),
  port;

var wii = new Wii();
wii.connect(function() {
  //setInterval(send, 500);
  wii.sendRcValues(1500, 1500, 2000, 900, function() {
    wii.readRcValues();

    wii.readAtomicServo();
  });
});

var times = 0;
var messages = [100, 101, 105, 115];
function send() {
  var message = messages[(times++)%messages.length];
  console.log('message: ' + message);
  wii.send([message]);
}
