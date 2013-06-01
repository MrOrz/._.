(function(){
  "use strict";
  var socket = io.connect();
  socket.on('connect', function (data) {
    console.log('Connected');
  });
}());