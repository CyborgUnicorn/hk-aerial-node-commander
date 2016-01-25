
module.exports = function (left, right) {
  console.log('set servo offset', left, right);
  var msg = new Buffer(8);
  msg.writeUInt8(0, 0);
  msg.writeUInt8(0, 1);
  msg.writeUInt8(0, 2);
  msg.writeUInt8(0, 3);
  msg.writeUInt8(left, 4);
  msg.writeUInt8(right, 5);
  msg.writeUInt8(0, 6);
  msg.writeUInt8(0, 7);
  return { id: 54, data: msg };
};
