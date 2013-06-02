var crypto = require('crypto');

var ROOMKEY = 'ldashlhrntlawerfcasdf'

exports.generateRoomId = function(){
  return crypto.createHmac('sha1', ROOMKEY)
    .update("" + new Date).digest('hex').slice(3,7);

}