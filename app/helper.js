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

exports.setAuthToken = function(res, roomId){
  res.cookie('auth_token', roomId, { signed: true, httpOnly: true });
  return roomId;
};

exports.clearAuthToken = function(res){
  res.clearCookie('auth_token');
};

exports.getRoomIdFromAuthToken = function(req){
  return req.signedCookies.auth_token;
};

// Check if the user is lecturer.
exports.checkAuthToken = function(req, roomId){
  return req.signedCookies.auth_token == roomId;
};
