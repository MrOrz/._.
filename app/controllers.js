var helper = require('./helper')
  , roommanager = require('./roommanager');


// Homepage.
exports.index = function(req, res){
  var embedUrl = req.protocol + "://" + req.get('host') +
      '/c.js';

  var roomId = helper.getRoomIdFromAuthToken(req) || helper.generateRoomId();
  helper.setAuthToken(res, roomId);


  var flash = helper.getFlashObject(req);
  console.log(flash);

  res.render('index', {
    embedUrl: embedUrl,
    roomId: roomId,
    flash: flash
  });
};

exports.renew = function(req, res){
  helper.clearAuthToken(res);
  req.flash('success', '教室號碼已經更新。');

  res.redirect('/');
}
