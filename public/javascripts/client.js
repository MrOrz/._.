$(function() {
  console.log(Questions);
  var rid = /rid=([^&]+)/.exec(window.location.search)[1];
  if (!rid) {
    console.log("no rid");
    return;
  }
  var stringBuild = [
    '<div class="ihq-tool-box">',
      '<div class="ihg-tool">',
        '<i class="icon-search">',
        '</i>',
        '<div> class="ask"',
        '</div>',
      '</div>',
      '<div class="ihq-question-queue">',
      '</div>',
    '</div>'
  ];
  $('body').append(stringBuild.join(''));
  var questionCollection = new Questions();
  var view = new QuestionView({
    el: $(".ihq-question-queue"),
    collection: questionCollection
  });

  var Router = Backbone.Router.extend({
    routes: {
      ":foo": "func1",
    },
    func1: function(p1) {
        console.log('func1: '+p1);
    },
  });

});
