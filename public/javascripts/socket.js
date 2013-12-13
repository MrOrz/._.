var io = require('socket.io-client'),
    helper = require('./helper');

var userId = ("" + Math.random()).slice(2);

var _socket = io.connect(helper.serverUrl, {
  query: 'roomId=' + roomId
});
_socket.on('connect', function (data) {
  console.log('Connected');
});

// Current-user aware socket.
exports.emit = function(evt, data){
  // Append user id in data.
  data.userId = userId;
  _socket.emit(evt, data);
};
exports.on = function(evt, callback){
  // Check user id.
  _socket.on(evt, function(data){
    if(data.userId !== userId){
      callback(data);
    }
  });
};
