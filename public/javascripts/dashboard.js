
var questionCollection = new Questions();

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


$('.add-question').click(function() {
    var model = new Question({
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
    });
    questionCollection.add(model);

    // TODO: socket.io.emit
    socket.emit('client:ask', model.toJSON());
  });

