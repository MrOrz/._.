
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.dashboard = function(req, res){
  console.log('slide id:', req.params.id);
  res.render('dashboard', {});
}