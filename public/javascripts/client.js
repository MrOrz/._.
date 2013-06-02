$(function() {

  // 0: normal
  // 1: select location
  // 2: select mode
  // reset when page change
  var askState = 0;

  function updatePage(urlHash) {
    if (window.location.hash == urlHash) {
      return;
    }
    askState = 0;
    window.location.hash = urlHash;
    if (sync) {
      window.socket.emit("server:pagechange", {
        'urlHash': urlHash
      });
    }
  }

  // init
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
        '我有問題！</button>',
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


  if (sync) {
    window.socket.on('pagechange', function(data) {
      updatePage(data.urlHash);
    });
  }
  
  var askQuestionBlock = $([
    "<div class='ihq-popup-window' style='postition: absolute;z-index:100000;'>",
      "<div class='ihq-repeat'>",
        "<button class='repeat-btn ihq-btn'>再重說一次</button>",
      "</div>",
      "<div>",
        '<div class="ihq-enter-question">輸入問題</div>',
        "<input type='text' class='question-text'></input>",
        "<button class='question-btn ihq-btn'>送出問題</button>",
      "</div>",
    "</div>"].join(""));
  $("body").append(askQuestionBlock);
  askQuestionBlock.hide();
  $("body").mousemove(function(event) {
    if (1 != askState) {
      return true;
    }
    console.log(event);
  });
  $("body").click(function(event) {
    if (1 != askState) {
      return true;
    }
    askState = 2;
    console.log(event);
    askQuestionBlock.offset({top: event.offsetY, left: event.offsetX});
    askQuestionBlock.css("position", "absolute");
    askQuestionBlock.show();
  });
  $(".repeat-btn", askQuestionBlock).click(function(event) {
    questionCollection.add(new Question({
      'location': {
        'x': askQuestionBlock.css("left"),
        'y': askQuestionBlock.css("top"),
        'pageurl': window.location.hash,
      },
      // repeat or question
      'type': 0,
      // done, or to be answer
      'state': 0,
      // +1
      'count': 1,
    }));
    // TODO: socket.emit
    askQuestionBlock.hide();
    askState = 0;
  });
  $(".question-btn", askQuestionBlock).click(function(event) {
    questionCollection.add(new Question({
      'location': {
        'x': askQuestionBlock.css("left"),
        'y': askQuestionBlock.css("top"),
        'pageurl': window.location.hash,
      },
      // repeat or question
      'type': 0,
      // for question
      'str': $(".question-text", askQuestionBlock).val(),
      // done, or to be answer
      'state': 0,
      // +1
      'count': 1,
    }));
    // TODO: socket.emit
    askQuestionBlock.hide();
    askState = 0;
  });


  $('.add-question').click(function(event) {
    askState = 1;
    event.stopPropagation();
  });
});


