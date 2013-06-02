
/**
 * Module dependencies.
 */

var express = require('express')
  , controllers = require('./app/controllers')
  , roommanager = require('./app/roommanager')
  , http = require('http')
  , path = require('path')
  , socketio = require('socket.io')
  , mongoose = require('mongoose');

var app = express()
  , server = http.createServer(app)
  , io = socketio.listen(server)
  , cookieParser = express.cookieParser('oiqwjuoi4eutnvaiojflkajpodiwdhugehqvoint;ortj[0qvt0,p92375ptqmtovkavawfvw');

io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
  io.set('authorization', function(handshakeData, callback){
    console.log('Handshake', handshakeData);
    var roomId = handshakeData.query.id;

    handshakeData.roomId = roomId;

    // Check cookie.
    cookieParser(handshakeData, {}, function(err){
      handshakeData.isLecturer = helper.checkAuthToken(handshakeData);
      callback(null, true);
    })
  });
});

// Pass socket to roommanager,
// delegating the socket events to roommanager.
roommanager.setSockets(io.sockets);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(cookieParser);
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', controllers.index);
app.post('/room/create', controllers.create);
app.get('/dashboard/:id', controllers.dashboard);

// TODO: remove them.
app.get('/questions/:roomId', controllers.getQuestions);
app.post('/questions/:roomId', controllers.postQuestions);
app.put('/questions/:roomId', controllers.putQuestions);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
