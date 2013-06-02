$(function() {
  var Question = Backbone.Model.extend({
    initialize: function() {
      this.bind('change:state', function() {
        console.log(this);
        // TODO:
      });
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
      //this.bind('add', options.view.addQuestion);
    },
    model: Question
  });

  var QuestionView = Backbone.View.extend({
    initialize: function() {
      this.collection.bind('add', this.addQuestion);
      this.$el.append("<ul class='question-list'></ul>");
    },
    events: {
      'click .question-list li': "clickModel"
    },
    addQuestion: function(model) {
      console.log(model);
      var obj = $("<li></li>");
      obj.attr("mid", model.cid);
      console.log(model.get('location'));
      if (1 == model.get('type')) {
        obj.html(model.get('str'));
      } else {
        obj.html("repeat please!!");
      }
      $('.question-list', this.$el).append(obj);
    },
    clickModel: function(event) {
      var id = $(event.target).attr('mid');
      console.log(this.collection.get(id));
    }
  });

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
      'state': 1,
      // +1
      'count': 1,
    }));
  });
});
