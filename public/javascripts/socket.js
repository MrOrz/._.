(function(){
  "use strict";
  var rid = /rid=([^&]+)/.exec(window.location.search);
  if (!rid) {
    console.log("no rid");
  } else {
    $("body").attr("data-room-id", rid[1]);
  }

  var userId = "" + Math.random();

  var _socket = io.connect(window.iHaveQUrl || '/', {
    query: 'roomId=' + $('body').attr('data-room-id')
  });
  _socket.on('connect', function (data) {
    console.log('Connected');
  });

  // Current-user aware socket.
  window.socket = {
    emit: function(evt, data){
      // Append user id in data.
      data.userId = userId;
      _socket.emit(evt, data);
    },
    on: function(evt, callback){
      // Check user id.
      _socket.on(evt, function(data){
        if(data.userId !== userId){
          callback(data);
        }
      });
    }
  };
}());
