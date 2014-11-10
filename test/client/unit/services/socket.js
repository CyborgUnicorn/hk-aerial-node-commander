describe('/services/socket', function () {

  var service, socket;

  beforeEach(function () {
    socket = {
      on: sinon.stub(),
      emit: sinon.stub()
    };
    window.io = {
      connect: sinon.stub().returns(socket)
    };

    module('hk-aerial-commander');
    inject(function (_socket_) {
      service = _socket_;
    });
  });
  it('connects to the server', function () {
    expect(io.connect).calledOnce.calledWith('http://localhost');
  });
  it('passes on through', function () {
    var listener = sinon.spy();
    service.on('foo', listener);
    expect(socket.on).calledWith('foo', listener);
  });
  it('passes emit through', function () {
    var listener = sinon.spy();
    service.emit('foo', 'bar', listener);
    expect(socket.emit).calledWith('foo', 'bar', listener);
  });

});