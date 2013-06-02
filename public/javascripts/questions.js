var Socket = undefined;

var Question = Backbone.Model.extend({
  initialize: function() {
  },
  defaults: {
    // slide location
    'location': {
      'x': 0,
      'y': 0,
      'pageurl': '',
    },
    // repeat or question
    'type': 0,
    // for question
    'str': '',
    // done, or to be answer
    'state': 0,
    // +1
    'count': 0,
  },
});

var Questions = Backbone.Collection.extend({
  initialize: function(options) {
  },
  model: Question,
});

var QuestionView = Backbone.View.extend({
  initialize: function() {
    this.collection.bind('add', this.addQuestion);
    this.collection.bind('change:state', this.changeQuestionState);
    this.collection.bind('change:count', this.changeQuestionCount);
    // this.$el.append("<ul class='question-list'></ul>");
  },
  events: {
    'click .content': 'doneQuestion',
    'click .plus': 'plusOneQuestion',
  },
  addQuestion: function(model) {
    // TODO: socket.io.emit
    console.log(model);
    var obj = $('<div class="one-question"><div class="content"></div><div class="plus"></div></div>');
    obj.attr("mid", model.cid);
    // console.log(model.get('location'));
    if (1 == model.get('type')) {
      $(".content", obj).html(model.get('str'));
    } else {
      $(".content", obj).html("repeat please!!");
    }
    // obj.append($("<button class='done-btn'>done</button><button class='plus-btn'>+1</button>"));
    this.$el.append(obj);
  },
  changeQuestionState: function(model) {
    // TODO: socket.io.emit
    console.log('changeQuestionState', model);
  },
  changeQuestionCount: function(model) {
    // TODO: socket.io.emit
    console.log('changeQuestionCount', model);
  },
  doneQuestion: function(event) {
    var id = $(event.target).parent().attr('mid');
    $(event.target)
    console.log(id);
    var model = this.collection.get(id);
    var state = model.get('state');
    model.set('state', 1);
  },
  plusOneQuestion: function(event) {
    var id = $(event.target).parent().attr('mid');
    var model = this.collection.get(id);
    var count = model.get('count');
    model.set('count', count + 1);
  },
});
/*
  var questionCollection = new Questions();

  var view = new QuestionView({
    el: $("#questions"),
    collection: questionCollection
  });

  $('#test-btn').click(function() {
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

*/