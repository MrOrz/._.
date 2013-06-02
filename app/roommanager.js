var rooms = {}
  , sockets;

var url = require('url')
  , helper = require('./helper');


var Room = function(options){
  this.id = options.roomId; // The room id (key)
  this.slideUrl = options.url;  // The url the lecturer entered.
  this.drawings = [];
  this.questions = [];

  var urlObj = url.parse(this.slideUrl, true);
  urlObj.query = urlObj.query || {};
  urlObj.query.rid = this.id;

  this.clientUrl = url.format(urlObj); // The url lecturer gives to students

  urlObj.query.sync = 1;
  this.projectorUrl = url.format(urlObj); // The url used in projector.
}

exports.create = function(roomId, url){
  rooms[roomId] = new Room({
    roomId: roomId,
    url: url
  });
  return rooms[roomId];
},

exports.get = function(roomId){
  // get room by roomId
  return rooms[roomId];
}

exports.close = function(roomId){
  delete rooms[roomId];
},

exports.setSockets = function(s){

  // Set socket
  sockets = s;

  // Join users to a room
  sockets.on('connection', function(socket){
    var roomId = socket.handshake.roomId,
        room = rooms[roomId],
        isLecturer = socket.handshake.isLecturer;

    console.info('User joining slide', roomId, ', isLecturer=', isLecturer);
    socket.join(roomId);

    // broadcast helper of current room.
    var broadcast = function(event, data){
      return sockets.in(roomId).emit(event, data);
    };

    // Event handling
    socket.on('client:draw', function(data){
      console.log('client draw', data);
    });
    socket.on('client:ask', function(data){
      console.log('client ask', data);
      room.questions.push(data);
      broadcast('ask', data);
    });
    socket.on('server:answer', function(data){
      if(!isLecturer) return; // Ignore non-lecturer requests

      console.log('server answer', data);
      broadcast('answer', data);
    });
    socket.on('server:over', function(data){
      if(!isLecturer) return; // Ignore non-lecturer requests

      console.log('server over', data);
      //roommanager.close();
      broadcast('over', data);
    });
    socket.on('server:pagechange', function(data){
      if(!isLecturer) return; // Ignore non-lecturer requests

      broadcast('pagechange', data);
    });
  });
};