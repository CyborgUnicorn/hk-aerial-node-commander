
exports.messageId = 13;

exports.parse = function(data) {
  return data.readInt16LE(0);
};
