var helper = require('./helper')
  , roommanager = require('./roommanager');


// Homepage.
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
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
  res.render('dashboard', {roomId: roomId});
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

// Handling questions
exports.getQuestions = function(req, res){
  console.log('get questions:', req.params.roomId);
}
exports.postQuestions = function(req, res){
  console.log('create questions:', req.params.roomId);
}
exports.putQuestions = function(req, res){
  console.log('created room param:', req.params.roomId);
}