
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log('req', req);
  res.render('index', { title: '我有問題！' });
};