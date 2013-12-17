// Helper function / properties

// $ and $$ snippets from
// https://developer.mozilla.org/en-US/Add-ons/Code_snippets/QuerySelector?redirectlocale=en-US&redirectslug=Code_snippets%2FQuerySelector
function $ (selector, el) {
  if (!el) {el = document;}
  return el.querySelector(selector);
}
function $$ (selector, el, useArray) {
  if (!el) {el = document;}

  if (useArray) {
    return Array.prototype.slice.call(el.querySelectorAll(selector));
  }

  // Note: the returned object is a NodeList.
  return el.querySelectorAll(selector);
}

var scriptTag = $('#°▽°ﾉ');

exports.serverUrl = scriptTag.src.replace('/c.js', '');
exports.$ = $;
exports.$$ = $$;
exports.roomId = scriptTag.dataset.roomId;
exports.loadStyle = function(url) {
  var s = document.createElement('link');
  var t = document.getElementsByTagName('link')[0];
  s.rel = "stylesheet";
  s.href = exports.serverUrl + url;
  t.parentNode.insertBefore(s, t);
};

exports.html2Elem = function(html, elem, attrs){
  var div = document.createElement(elem || "div");
  if(attrs){
    for(var attrName in attrs){
      if(attrs.hasOwnProperty(attrName)){
        div.setAttribute(attrName, attrs[attrName]);
      }
    }
  }

  div.innerHTML = html;
  return div;
}