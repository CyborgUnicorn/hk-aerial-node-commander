
exports.messageId = 11;

exports.parse = function(data) {
  console.log('rawMotorEnabled', data);
  return data.readInt8(0) !== 0;
};