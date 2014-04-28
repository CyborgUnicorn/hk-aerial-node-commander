
exports.parse = function(data) {
  var pos = 0;
  return {
    cycleTime: data[pos++] + (data[pos++] << 8),
    i2cErrorCount: data[pos++] + (data[pos++] << 8),
    accBaro: data[pos++] + (data[pos++] << 8),
    dafuq: data[pos++] + (data[pos++] << 8) + (data[pos++] << 16) + (data[pos++] << 24),
    globalConf: data[pos]
  };
};