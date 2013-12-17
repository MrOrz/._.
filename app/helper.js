var crypto = require('crypto');

var ROOMKEY = 'ldashlhrntlawerfcasdf'

exports.generateRoomId = function(){
  return crypto.createHmac('sha1', ROOMKEY)
    .update("" + new Date).digest('hex').slice(3,7);
};

exports.getFlashObject = function(req){
  var success = req.flash('success').join('<br>'),
      error = req.flash('error').join('<br>');

  if(success){
    return {
      type: 'success',
      text: success
    }
  }

  if(error){
    return {
      type: 'error',
      text: error
    }
  }

  return null;
};

exports.setAuthToken = function(res, roomIds){
  res.cookie('auth_token', JSON.stringify(roomIds), { signed: true, httpOnly: true });
  return roomIds;
};

exports.clearAuthToken = function(res){
  res.clearCookie('auth_token');
};

exports.getRoomIdsFromAuthToken = function(req){
  var str = req.signedCookies.auth_token, result;

  if(!str){
    result = [];
  }else{
    try {
      result = JSON.parse(str);
    } catch (e) { // Legacy cookies goes here.
      result = [ str ];
    }
  }

  return result;
};

// Check if the user is lecturer.
exports.checkAuthToken = function(req, roomId){
  var roomIds = getRoomIdsFromAuthToken(req);
  return roomIds.indexOf(roomId) !== -1;
};
