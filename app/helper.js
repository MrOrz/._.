var crypto = require('crypto');

var ROOMKEY = 'ldashlhrntlawerfcasdf'

exports.generateRoomId = function(){
  return crypto.createHmac('sha1', ROOMKEY)
    .update("" + new Date).digest('hex').slice(3,7);

}

exports.setAuthToken = function(res, roomId){
  res.cookie('auth_token', roomId, { signed: true, httpOnly: true });
  return roomId;
}

// Check if the user is lecturer.
exports.checkAuthToken = function(req, roomId){
  return req.signedCookies.auth_token == roomId;
}