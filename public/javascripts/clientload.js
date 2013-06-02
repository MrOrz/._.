(function() {
  var scriptList = [
    '/javascripts/dependencies.js',
    '/socket.io/socket.io.js',
    '/javascripts/questions.js',
    '/javascripts/client.js'];
  var styleList = [
    '/stylesheets/style.css'
  ];
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
  }
  function loadStyle() {
    if (0 == stypleList.length) {
      return;
    }
    var s = document.createElement('link');
    var t = document.getElementsByTagName('link')[0];
    s.rel = "stylesheet";
    s.href = rootUrl + styleList[0];
    s.onload = loadStyle;
    t.parentNode.insertBefore(s, t);
    styleList.shift();
  }

  loadScript();
  loadStyle();
})();
