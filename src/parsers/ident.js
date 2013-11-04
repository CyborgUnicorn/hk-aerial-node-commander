
var types = [
  'UNKNOWN',
  'TRI',
  'QUADP',
  'QUADX',
  'BI',
  'GIMBAL',
  'Y6',
  'HEX6',
  'FLYING_WING',
  'Y4',
  'HEX6X',
  'OCTOX8',
  'OCTOFLATP',
  'OCTOFLATX'
];

exports.parse = function(data) {
  return {
    version: data[0],
    multitype: types[data[1]],
    version: data[2]
  }
};