
module.exports = function (left, right) {
  var msg = new Buffer(8);
  msg.writeInt8(0, 0);
  msg.writeInt8(0, 1);
  msg.writeInt8(0, 2);
  msg.writeInt8(0, 3);
  msg.writeInt8(left, 4);
  msg.writeInt8(right, 5);
  msg.writeInt8(0, 6);
  msg.writeInt8(0, 7);
  return { id: 54, data: msg };
};
