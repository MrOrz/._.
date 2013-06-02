(function() {
  var scriptList = [
    '/javascripts/dependencies.js',
    '/socket.io/socket.io.js',
    '/javascripts/socket.js',
    '/javascripts/questions.js',
    '/javascripts/client.js'];
  var styleList = [
    '/stylesheets/style.css'
  ];
  window.iHaveQUrl = 'http://localhost:3000';
  function loadScript() {
    if (0 == scriptList.length) {
      return;
    }
    var s = document.createElement('script');
    var t = document.getElementsByTagName('script')[0];
    s.type = 'text/javascript';
    s.src = window.iHaveQUrl + scriptList[0];
    s.onload = loadScript;
    t.parentNode.insertBefore(s, t);
    scriptList.shift();
  }
  function loadStyle() {
    if (0 == styleList.length) {
      return;
    }
    var s = document.createElement('link');
    var t = document.getElementsByTagName('link')[0];
    s.rel = "stylesheet";
    s.href = window.iHaveQUrl + styleList[0];
    s.onload = loadStyle;
    t.parentNode.insertBefore(s, t);
    styleList.shift();
  }

  loadScript();
  loadStyle();
})();
