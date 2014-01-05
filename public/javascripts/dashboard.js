
var questionCollection = new Questions();

// Populate questions
socket.on('init', function(data){
  questionCollection.reset(data.questions);
});

var view = new QuestionView({
  el: $(".owo-question-queue"),
  collection: questionCollection
});

