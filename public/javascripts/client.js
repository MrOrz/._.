$(function() {
  var rid = /rid=([^&]+)/.exec(window.location.search);
  if (!rid) {
    console.log("no rid");
    return;
  }
  rid = rid[1];
  var stringBuild = [
    '<div class="ihq-tool-box">',
      '<div class="ihg-tool">',
        '<i class="icon-search">',
        '</i>',
        '<div class="ask">',
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

  var canvasMap = {}

  var Router = Backbone.Router.extend({
    routes: {
      ":foo": "page",
      ":foo/:bar" : "subpage",
    },
    page: function(p1) {
      console.log('page: '+p1);
    },
    subpage: function(p1, p2) {
      console.log('subpage: '+p1 + ',' + p2);
    },
  });
  var router = new Router();
  Backbone.history.start();
});
