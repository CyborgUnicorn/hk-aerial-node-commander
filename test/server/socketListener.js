var chai = require('chai'),
  expect = chai.expect,
  sinon = require('sinon'),
  sinonPromise = require('sinon-promise'),
  proxyquire = require('proxyquire');

chai.use(require('sinon-chai'));
sinonPromise(sinon);

describe('/socketListener', function () {
  var socketListener, multiwii, wii, socket, devices;

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
    devices = [{comName: "/dev/cu.usbmodem1411", manufacturer: "Arduino LLC"}];
    multiwii = {
      list: sinon.promise().resolves(devices)
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
    it('returns wii.connected and devices list', function () {
      var listener = sinon.spy();

      socket.on.withArgs('status').yield(listener);
      expect(multiwii.list).calledOnce;
      expect(listener).calledOnce.calledWith({
        connected: false,
        devices: devices
      });

      wii.connected = true;
      socket.on.withArgs('status').yield(listener);
      expect(multiwii.list).calledTwice;
      expect(listener).calledTwice.calledWith({
        connected: true,
        devices: devices
      });
    });
  });
});