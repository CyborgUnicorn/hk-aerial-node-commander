
module.exports = function (val) {
  var msg = new Buffer(1);
  msg.writeInt8(val ? 16 : 0, 0);
  console.log('setRawMotorEnabled', val);
  return { id: 53, data: msg };
};