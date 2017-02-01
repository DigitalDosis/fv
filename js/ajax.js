var isAnimating = false;
var newPage;
var currentPage;
var sections = { 
	home : {
		animationTimeEnter: 1000,
		animationTimeExit: 2000,
		animationFunctionEnter: function() { homeAnimationEnter(); },
		animationFunctionExit: function() { homeAnimationExit(); }
	},
	hub : {
		animationTimeEnter: 1000,
		animationTimeExit: 2000,
		animationFunctionEnter: function() { hubAnimationEnter(); },
		animationFunctionExit: function() { hubAnimationExit(); }
	},
	landing: {
		animationTimeEnter: 1000,
		animationTimeExit: 2000,
		animationFunctionEnter: function() { landingAnimationEnter() },
		animationFunctionExit: function() { landingAnimationExit() } 
	}
};


$(document).ready(function() {
	var pageArray = location.pathname.split('/');
	currentPage = pageArray[pageArray.length - 1];

	$('#main').on('click', '[data-type="page-transition"]', function(event){
	    event.preventDefault();
	    //detect which page has been selected
	    newPage = $(this).attr('href');
	    //if the page is not animating - trigger animation
	    if( !isAnimating ) changePage(newPage);
	});


	$(window).on('popstate', function() {
	    var newPageArray = location.pathname.split('/'),
	        newPage = newPageArray[newPageArray.length - 1];
	    	changePage(newPage);
	});

});

function changePage(url) {
	var newSectionName = url.replace('.html', '');

	currentPage === "" ? currentPage = 'home' : currentPage;
	newSectionName === "" ? newSectionName = 'home' : newSectionName;

    isAnimating = true;
	sections[currentPage].animationFunctionExit();
	setTimeout(function() {
		loadNewContent(url);
	}, sections[currentPage].animationTimeExit);

	currentPage = newSectionName;
}

function loadNewContent(url){
  	var section = $('<div class="ajax"></div>');

  	section.load( url + ' .content', function(event){
		  
      	$('#main').html(section);

      	setTimeout(function() {
      		sections[currentPage.replace('.html', '')].animationFunctionEnter();
      	}, 600);

      	//Update history
      	if(url != window.location){
        	window.history.pushState({path: url},'',url);
      	}
  	});

}

/** Animation callbacks **/

var homeAnimationEnter = function () {
	console.log("home Enter");

	$('header, footer').toggleClass('grey');
	$('.layer-mask').toggleClass('SlideInUp');
};

var homeAnimationExit = function () {
	console.log("home Exit");
	
	$('header, footer').toggleClass('grey');
	$('.layer-mask').toggleClass('SlideInUp');
};

var hubAnimationEnter = function () {
	console.log("hub Enter");

	$('.container_composition').toggleClass('covered');
};

var hubAnimationExit = function () {
	console.log("hub Exit");

	$('.container_composition').toggleClass('covered');
};

var landingAnimationEnter = function () {
	console.log("landing Enter");
};

var landingAnimationExit = function () {
	console.log("landing Exit");
};
