var rooms = {}
  , sockets;

var url = require('url')
  , helper = require('./helper');


var Room = function(roomId){
  this.id = roomId; // The room id (key)
  this.questions = {};
}

exports.create = function(roomId){
  rooms[roomId] = new Room(roomId);
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
    // The handshake data is set by socket.io authentication part.
    //
    var roomId = socket.handshake.roomId,
        room = rooms[roomId],
        isLecturer = socket.handshake.isLecturer;

    console.info('User joining slide', roomId, ', isLecturer=', isLecturer);
    socket.join(roomId);

    // Send init data
    socket.emit('init', {
      questions: room.questions,
      isLecturer: isLecturer
    });

    // broadcast helper of current room.
    var broadcast = function(event, data){
      return sockets.in(roomId).emit(event, data);
    };

    // Event handling
    socket.on('ask', function(instance){
      console.log('ask', instance);

      room.questions[instance.id] = instance;
      broadcast('ask', instance);
    });
    socket.on('plus', function(data){
      var instance = room.questions[data.id];

      if(!instance){
        console.error("No such question instance id in room", roomId, ": ", data.id);
        return;
      }

      if(instance.backers.indexOf(data.$$userId) === -1){
        instance.backers.push(data.$$userId);
      }

      broadcast('plus', {
        id: instance.id, backers: instance.backers
      });
    })
    socket.on('answer', function(data){
      if(!isLecturer) return; // Ignore non-lecturer requests
      var question = room.questions[data.id];

      if(!question){
        console.error("No such question instance id in room", roomId, ": ", data.id);
        return;
      }

      console.log('server answer', question);
      delete room.questions[data.id];
      broadcast('answer', data);
    });
  });
};
