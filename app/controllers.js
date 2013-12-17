var helper = require('./helper')
  , roommanager = require('./roommanager');


// Homepage.
exports.index = function(req, res){
  var embedUrl = req.protocol + "://" + req.get('host') +
      '/c.js';

  // If the user doesn't own any roomIds, add one.
  var roomIds = helper.getRoomIdsFromAuthToken(req)
  if( roomIds.length === 0 ){
    roomIds.push(helper.generateRoomId());
  }
  helper.setAuthToken(res, roomIds);

  res.render('index', {
    embedUrl: embedUrl,
    roomIds: roomIds,
    flash: helper.getFlashObject(req)
  });
};

// Add a new roomId for the current user.
exports.add = function(req, res){
  var roomIds = helper.getRoomIdsFromAuthToken(req) || [];
  roomIds.push( helper.generateRoomId() );
  helper.setAuthToken( res, roomIds );

  req.flash('success', '已新增投影片號碼。');

  res.redirect('/');
}

// Clears all existing roomIds for the current user.
exports.clear = function(req, res){
  helper.clearAuthToken(res);
  req.flash('success', '投影片號碼已經重設。');

  res.redirect('/');
}

exports.serveClient = function(req, res){
  res.sendfile("public/javascripts/clientload.js");
}

exports.testpage = function(req, res) {
  res.sendfile("public/reveal-js.html");
}
