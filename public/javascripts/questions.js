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
    this.collection.bind('add', this.addQuestion, this);
    this.collection.bind('reset', this.addAllQuestions, this);
    this.collection.bind('change:state', this.changeQuestionState, this);
    this.collection.bind('change:count', this.changeQuestionCount, this);
    // this.$el.append("<ul class='question-list'></ul>");

    socket.on('ask', _.bind(this.addQuestionRemote, this));
    socket.on('answer', _.bind(this.changeQuestionStateRemote, this));
  },
  events: {
    'click .content': 'gotoQuestion',
    'click .delete': 'doneQuestion',
    'click .plus': 'plusOneQuestion',
  },
  addQuestion: function(model) {
    console.log(model);
    var obj = $('<div class="one-question"><div class="content"></div><div class="plus"></div><div class="delete"></div></div>');
    obj.attr("mid", model.cid);
    // console.log(model.get('location'));
    if (1 == model.get('type')) {
      $(".content", obj).html(model.get('str'));
    } else {
      $(".content", obj).html("請再重複一次");
    }
    console.log('model', this.el);
    $(this.el).append(obj);
    if ('server' == $("body").attr("role")) {
      $(".plus", obj).hide();
    } else {
      $(".delete", obj).hide();
    }
  },
  addAllQuestions: function() {
    var that = this;
    this.collection.forEach(function(model){
      that.addQuestion(model);
    });
  },
  addQuestionRemote: function(data){
    this.collection.add(new Question(data));
  },
  changeQuestionState: function(model) {
    console.log('changeQuestionState', model);
    var mid = model.cid
    $("[mid="+mid+"]").remove();
    this.deletePointer(model);
  },
  changeQuestionCount: function(model) {
    // TODO: show the count number!
    console.log('client:change', model);
  },
  changeQuestionStateRemote: function(data){
    console.log('changeQuestionStateRemote', data);
  },
  doneQuestion: function(event) {
    if ('server' != $("body").attr("role")) {
      return;
    }
    var id = $(event.target).parent().attr('mid');
    var model = this.collection.get(id);
    var state = model.get('state');
    model.set('state', 1);

    // TODO: socket.io.emit
    socket.emit('client:ask', model.toJSON());
  },
  plusOneQuestion: function(event) {
    var id = $(event.target).parent().attr('mid');
    var model = this.collection.get(id);
    var count = model.get('count');
    model.set('count', count + 1);

    // TODO: socket.io.emit
  },
  gotoQuestion: function(event) {
    var id = $(event.target).parent().attr('mid');
    var model = this.collection.get(id);
    if ('server' == $("body").attr("role")) {
      // TODO: change iframe url
    } else {
      window.location.hash = model.get(location).pageurl;
    },
    deletePointer: function(model) {
      $('[mid='+model.cid+']', 'body .pointer-collection').remove();
    },
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
