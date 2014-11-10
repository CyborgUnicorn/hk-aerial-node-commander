var chai = require('chai'),
  expect = chai.expect,
  sinon = require('sinon'),
  sinonPromise = require('sinon-promise'),
  proxyquire = require('proxyquire');

chai.use(require('sinon-chai'));
sinonPromise(sinon);

describe('/socketListener', function () {
  var socketListener, multiwii, wii, socket;

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
      list: sinon.promise().resolves([wii])
    };
    socket = {
      on: sinon.stub(),
      once: sinon.stub(),
      emit: sinon.stub()
    };
    var SocketListener = proxyquire(process.cwd() + '/lib/socketListener', {
      'multiwii': multiwii
    }).SocketListener;

    socketListener = new SocketListener(socket, wii);
  });
  describe('status', function () {
    it('returns wii.connected', function () {
      var listener = sinon.spy();

      socket.on.withArgs('status').yield(listener);
      expect(listener).calledOnce.calledWith(null, {connected: false});

      wii.connected = true;
      socket.on.withArgs('status').yield(listener);
      expect(listener).calledTwice.calledWith(null, {connected: true});
    });
  });
});