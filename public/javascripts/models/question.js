var socket = require('../socket');

// The question class.
//
// The constructor is called only once on a client for each instance.
// Later than that, the instance is passed around by sockets.
// 
function Question(x, y, str) {
  this.id = Date.now(); // Assume this to be unique.
  this.url = window.location.hash;
  this.x = x;
  this.y = y;
  this.str = str;
  this.isAnswered = false;

  // The current user is the first backer.
  this.backers = [socket.userId];
}

// Expost the Question constructor
module.exports = Question;
