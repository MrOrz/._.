$(function() {
  console.log(Questions);
  var stringBuild = [
  	'<div class="ihg-tool-box">',
  		'<div class="ihg-tool">',
  			'<i class="icon-search">',
  			'</i>',
  			'<div> class="ask"',
  			'</div>',
  		'</div>',
  		'<div class="ihg-question-queue">',  			
  		'</div>',
  	'</div>'
  ];
  $('body').append(stringBuild.join(''));
});
