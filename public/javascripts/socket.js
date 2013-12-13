/**
  A socket wrapper that
  1. Adds userId internally to identify individual users, and
  2. Triggers callback immediately on local machine.

                            Socket Wrapper
                             (socket.js)
                     __________________________
               emit  |                        |  emit
             <-------+----+-------------------|<------
  SocketIO           |   /                    |            Presenter
   Server            |   \ (locally trigger)  |           (client.js)
             ------->|----+-------------------+------>
            broadcast|________________________|  on

  Please notice that under this implementation, event handlers bound using .on()
  IS EXPECTED TO EXECUTE TWICE if the current user is the emitter of an event.
  The event handlers should take care for the side-effects within the event
  handler!

*/

var io = require('socket.io-client'),
    helper = require('./helper');

// userId that identifies each user
var userId = ("" + Math.random()).slice(2);

// socket-io socket
//
var socket = io.connect(helper.serverUrl, {
  query: 'roomId=' + helper.roomId
});
socket.on('connect', function (data) {
  console.log('Connected');
});

// Internally keeps track of all callbacks.
var callbacks = {};

// Wrapped socket emit()
// When invoked, the callback on this event is immediately triggered
// with expectedResult. When socketIO server returns a justified result,
// the callback on the event will be triggered twice.
//
exports.emit = function(evt, data, expectedResult){
  // Append userId in data then emit.
  data.$$userId = userId;
  socket.emit(evt, data);

  // Trigger the callbacks of this event with expectedResult.
  if(callbacks[evt] && callbacks[evt].length > 0){
    callbacks[evt].forEach(function(cb){
      cb(expectedResult);
    });
  }
};

// Wrapped socket on()
//
exports.on = function(evt, callback){

  // Internally keeps track of the event handlers.
  if(!callbacks[evt]){ callbacks[evt] = []; }
  callbacks[evt].push(callback);

  // Bind event on socket.
  socket.on(evt, function(data){
    callback(data);
  });
};

// Expose the userId.
exports.userId = userId;
