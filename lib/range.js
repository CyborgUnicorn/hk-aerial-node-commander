
exports.messageId = 13;

exports.parse = function(data) {
  return data.readInt32LE(0);
};