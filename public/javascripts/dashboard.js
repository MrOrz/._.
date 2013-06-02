
var questionCollection = new Questions();

// Populate questions
socket.on('init', function(data){
  questionCollection.reset(data.questions);
});

var view = new QuestionView({
  el: $(".ihq-question-queue"),
  collection: questionCollection
});

