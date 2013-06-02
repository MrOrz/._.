$(function() {
  // init
  var rid = /rid=([^&]+)/.exec(window.location.search);
  if (!rid) {
    console.log("no rid");
    return;
  }
  rid = rid[1];

  var sync = /sync=([^&]+)/.exec(window.location.search);
  if (sync && '1' == sync[1]) {
    sync = true;
  }
  sync = false;

  // append bar
  var stringBuild = [
    '<div class="ihq-tool-box">',   
      '<div class="ihq-tool">',
        '<i class="icon-search">',
        '</i>',
        '<button class="add-question ihq-btn ihq-btn-warning" type="button">',
        'AddQuestion</button>',

      '</div>',
      '<div class="ihq-question-queue">',
      '</div>',
    '</div>'
  ].join('');
  $('body').append(stringBuild);
  var questionCollection = new Questions();
  var view = new QuestionView({
    el: $(".ihq-question-queue"),
    collection: questionCollection
  });

  var Router = Backbone.Router.extend({
    routes: {
      ":foo": "page",
      ":foo/:bar" : "subpage",
    },
    page: function(p1) {
      updatePage('#/' + p1);
    },
    subpage: function(p1, p2) {
      updatePage('#/' + p1 + '/' + p2);
    },
  });
  var router = new Router();
  Backbone.history.start();

  function undatePage(urlHash) {
    if (window.location.hash == urlHash) {
      return;
    }
    window.location.hash = urlHash;
    if (sync) {
      window.socket.emit("server:pagechange", {
        'urlHash': urlHash
      });
    }
  }

  if (sync) {
    window.socket.on('pagechange', function(data) {
      updatePage(data.urlHash);
    });
  }

  $('.add-question').click(function() {
      console.log('add question click(function()!');
      questionCollection.add(new Question({
        'location': {
          'x': 1,
          'y': 1,
          'pageurl': '/123',
        },
        // repeat or question
        'type': 1,
        // for question
        'str': 'Yoooooooo',
        // done, or to be answer
        'state': 0,
        // +1
        'count': 1,
      }));
    });
});


