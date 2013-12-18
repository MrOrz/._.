var helper = require('./helper')
  , roommanager = require('./roommanager');


// Homepage.
exports.index = function(req, res){

  // Make sure owo port number is added to the embed URL so that
  // Socket.io client does not pick up slide host's port number.
  var host = req.get('host');
  if(host.indexOf(':') === -1){
    host += ':80';
  }
  var embedUrl = req.protocol + "://" + host + '/c.js';

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