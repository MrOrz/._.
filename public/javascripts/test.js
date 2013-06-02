(function(){
  "use strict";
  var socket = io.connect('/', {
    query: 'roomId=' + $('body').attr('data-room-id')
  });
  socket.on('connect', function (data) {
    console.log('Connected');
  });
}());
