(function() {
  var scriptList = [
    '/javascripts/dependencies.js',
    '/socket.io/socket.io.js',
    '/javascripts/questions.js',
    '/javascripts/client.js'];
  var rootUrl = 'http://localhost:3000';
  function loadScript() {

    if (0 == scriptList.length) {
      return;
    }
    var s = document.createElement('script');
    var t = document.getElementsByTagName('script')[0];
    s.type = 'text/javascript';
    s.src = rootUrl + scriptList[0];
    s.onload = loadScript;
    t.parentNode.insertBefore(s, t);
    scriptList.shift();
/*
    var t = document.getElementsByTagName('script')[0];
    for (var i = 0; i < scriptList.length; ++i) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = rootUrl + scriptList[i];
      t.parentNode.insertBefore(s, t);
    }
*/
  }
  loadScript();
})();
