var helper = require('./helper')
  , roommanager = require('./roommanager');


// Homepage.
exports.index = function(req, res){
  var embedUrl = req.protocol + "://" + req.get('host') + req.url +
      'c.js';
  res.render('index', { embedUrl: embedUrl});
};

// Lecturer page.
exports.dashboard = function(req, res){
  console.log('slide id:', req.params.id);
  var roomId = req.params.id;

  // Check lecturer identity
  var isLecturer = helper.checkAuthToken(req, roomId);

  if(!isLecturer){
    res.redirect('/')
  }
  res.render('dashboard', {
    roomId: roomId,
    studentUrl: roommanager.get(roomId).clientUrl
  });
};

// Lecturer creating new slide.
exports.create = function(req, res){
  console.log('created room param:', req.body);

  // Creating room
  var room = roommanager.create(helper.generateRoomId(), req.body.url);

  // Set cookies for lecturer.
  helper.setAuthToken(res, room.id);

  // Redirect the lecturer to his/her dashboard.
  res.redirect('/dashboard/'+room.id);
}

exports.serveClient = function(req, res){
  res.sendfile("public/javascripts/clientload.js");
}

exports.testpage = function(req, res) {
  res.sendfile("public/reveal-js.html");
}
