var toByte = require('../../server/src/toByte').toByte
  , chai = require('chai')
  , expect = chai.expect;

describe('toByte', function () {
  it('converts < 255', function () {
    var result = toByte(255);
    expect(result[0]).to.equal(255);
    expect(result[1]).to.equal(0);
  });
  it('converts > 255', function () {
    var result = toByte(1500);
    expect(result[0]).to.equal(220);
    expect(result[1]).to.equal(5);
  });
});