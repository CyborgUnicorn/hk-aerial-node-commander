
exports.toByte = function (val) {
  return [ val & 0xff, val >> 8 ];
};