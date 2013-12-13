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

exports.$ = $
exports.$$ = $$
exports.serverUrl = scriptTag.src.replace('/c.js', '');
exports.roomId = scriptTag.dataset.roomId;