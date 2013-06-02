var helper = require('./helper')
  , roommanager = require('./roommanager');


// Homepage.
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

// Lecturer page.
exports.dashboard = function(req, res){
  console.log('slide id:', req.params.id);
  roomId = req.params.id;
  res.render('dashboard', {roomId: roomId});
};

// Lecturer creating new slide.
exports.create = function(req, res){
  console.log('created room param:', req.params);

  // Creating room
  var room = roommanager.create(helper.generateRoomId(), req.params.url);

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