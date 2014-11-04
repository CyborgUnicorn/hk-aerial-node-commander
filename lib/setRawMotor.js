
module.exports = function (front, right, left) {
  var msg = new Buffer(6);
  msg.writeInt16LE(front, 0);
  msg.writeInt16LE(right, 2);
  msg.writeInt16LE(left, 4);
  return { id: 52, data: msg };
}