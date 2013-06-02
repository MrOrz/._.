(function(){
  "use strict";
  window.socket = io.connect(window.iHaveQUrl || '/', {
    query: 'roomId=' + $('body').attr('data-room-id')
  });
  window.socket.on('connect', function (data) {
    console.log('Connected');
  });
}());