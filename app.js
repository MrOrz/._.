/**
 * Module dependencies.
 */

var express = require('express')
  , controllers = require('./app/controllers')
  , roomManager = require('./app/roommanager')
  , http = require('http')
  , path = require('path')
  , browserify = require('browserify-middleware')
  , socketio = require('socket.io')
  , helper = require('./app/helper')
  , mongoose = require('mongoose')
  , flash = require('connect-flash')
  , cors = require('cors');

var app = express()
  , server = http.createServer(app)
  , io = socketio.listen(server)
  , cookieParser = express.cookieParser('oiqwjuoi4eutnvaiojflkajpodiwdhugehqvoint;ortj[0qvt0,p92375ptqmtovkavawfvw');

io.configure(function () {
  // io.set("transports", ["xhr-polling"]);
  // io.set("polling duration", 10);
  io.set('authorization', function(handshakeData, callback){
    console.log('Handshake', handshakeData);
    var roomId = handshakeData.query.roomId;

    // Check if there is room.
    if(!roomId){
      callback(null, false);
      return;
    }

    // If the room does not exist yet, create it.
    if(!roomManager.get(roomId)){
      roomManager.create(roomId);
    }

    // Check cookie and set handshakeData.
    cookieParser(handshakeData, {}, function(err){
      handshakeData.roomId = roomId;
      handshakeData.isLecturer = helper.checkAuthToken(handshakeData, roomId);
      callback(null, true);
    });
  });
});

// Pass socket to roomManager,
// delegating the socket events to roomManager.
roomManager.setSockets(io.sockets);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(cookieParser);
  app.use(express.session({secret: '9p8auewnlivf2v893q2oftertvserays', cookie: {maxAge: 60000}}));
  app.use(flash());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', controllers.index);
app.post('/renew', controllers.renew);
// app.post('/create', controllers.create);
// app.get('/dashboard/:id', controllers.dashboard);
app.get('/c.js', browserify('./public/javascripts/client.js'));
app.get('/testpage', controllers.testpage);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
