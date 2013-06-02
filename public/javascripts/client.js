$(function() {
  console.log(Questions);
  var stringBuild = [
    '<div class="ihq-tool-box">',   
      '<div class="ihq-tool">',
        '<i class="icon-search">',
        '</i>',
        '<button class="add-question btn btn-warning" type="button">',
        'AddQuestion</button>',
      '</div>',
      '<div class="ihq-question-queue">',       
      '</div>',
    '</div>'
  ].join('');
  $('body').append(stringBuild);
  var view = new QuestionView({
    el: $(".ihq-question-queue"),
    collection: questionCollection
  });

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
});

$('.add-question').click(function() {
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

