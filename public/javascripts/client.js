$(function() {
  console.log(Questions);
  var rid = /rid=([^&]+)/.exec(window.location.search)[1];
  if (!rid) {
    console.log("no rid");
    return;
  }
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

// <<<<<<< HEAD
  questionCollection.add(new Question({
        'location': {
          'x': 1,
          'y': 1,
          'pageurl': '/123',
        },
        // repeat or question
        'type': 1,
        // for question
        'str': 123,
        // done, or to be answer
        'state': 0,
        // +1
        'count': 1,
  }));
// =======
  // var Router = Backbone.Router.extend({
  //   routes: {
  //     ":foo": "func1",
  //   },
  //   func1: function(p1) {
  //       console.log('func1: '+p1);
  //   },
  // });

// >>>>>>> 55b25735f06e87c36ebb3e5de460f795871a701d
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


