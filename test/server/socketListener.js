var chai = require('chai'),
  expect = chai.expect,
  sinon = require('sinon'),
  sinonPromise = require('sinon-promise'),
  proxyquire = require('proxyquire');

chai.use(require('sinon-chai'));
sinonPromise(sinon);

describe('/socketListener', function () {
  var socketListener, multiwii, wii;

  beforeEach(function () {
    wii = {
      connect: sinon.promise(),
      addOutMessage: sinon.spy(),
      addInMessage: sinon.spy(),
      read: sinon.stub(),
      setRawRc: sinon.promise(),
      setPid: sinon.promise(),
      setRawMotorEnabled: sinon.promise(),
      setRawMotor: sinon.promise(),
      setAccCalibration: sinon.promise(),
      on: sinon.stub(),
      once: sinon.stub(),
      dispose: sinon.stub(),
      connected: false
    };
    multiwii = {
      list: sinon.promise().resolves(wii)
    }
    wii = proxyquire(process.cwd() + '/lib/wii', {
      'multiwii': multiwii
    });
  });
  describe('connect', function () {
    it('calls serialport.list', function () {

    });
  });
});