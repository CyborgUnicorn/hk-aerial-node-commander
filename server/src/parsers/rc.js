
exports.parse = function(data) {
  var pos = 0;
  return {
    roll: data[pos++] + (data[pos++] << 8),
    pitch: data[pos++] + (data[pos++] << 8),
    yaw: data[pos++] + (data[pos++] << 8),
    throttle: data[pos++] + (data[pos++] << 8),
    aux1: data[pos++] + (data[pos++] << 8),
    aux2: data[pos++] + (data[pos++] << 8),
    aux3: data[pos++] + (data[pos++] << 8),
    aux4: data[pos++] + (data[pos++] << 8)
  };
};