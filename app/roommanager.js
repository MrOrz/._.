var rooms = {}
  , sockets;

var Room = function(roomId){
  this.id = roomId;
  this.drawings = [];
  this.questions = [];
}

module.exports = {
  create: function(roomId){
    rooms[roomId] = new Room(roomId);
    return rooms[roomId];
  },

  close: function(roomId){
    delete rooms[roomId];
  },

  emit: function(){

  },

  setSockets: function(s){

    // Set socket
    sockets = s;

    // Join users to a room
    sockets.on('connection', function(data){

    });

    // Event handling
    sockets.on('client:draw', function(data){
      console.log('client draw', data);
    });
    sockets.on('client:ask', function(data){
      console.log('client ask', data);
    });
    sockets.on('server:answer', function(data){
      console.log('client draw', data);
    });
    sockets.on('server:over', function(data){
      console.log('client draw', data);
    });
    sockets.on('server:pagechange', function(data){

    });
  }
};