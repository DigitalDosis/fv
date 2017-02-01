var isAnimating = false;
var isForward = false;
var newPage;

$(document).ready(function() {

	$('#main').on('click', '[data-type="page-transition"]', function(event){
	    event.preventDefault();
	    //detect which page has been selected
	    newPage = $(this).attr('href');
	    //if the page is not animating - trigger animation
	    if( !isAnimating ) changePage(newPage, true, isForward);
	});

	$(window).on('popstate', function() {
	    var newPageArray = location.pathname.split('/'),
	        //this is the url of the page to be loaded 
	        newPage = newPageArray[newPageArray.length - 1];
	        console.log(newPageArray);
	        console.log(newPage);
	        isForward = true;
	        console.log(isForward);
	    	changePage(newPage, true , true);
	});

});

function changePage(url, bool, forward) {
	var newSectionName = url.replace('.html', '');
    isAnimating = true;
    // trigger page animation exit
    if(!forward){
    	$('header, footer').toggleClass('grey');
		$('.layer-mask').toggleClass('SlideInUp');
		console.log('trigger page animation exit');
		//...
	    setTimeout(function() {
	    	loadNewContent(url, bool);
	    }, 1000);
	    //...
    }else{
    	$('.container_composition').toggleClass('covered');
    	console.log(forward);
    	//...
	    setTimeout(function() {
	    	loadNewContent(url, bool);
	    }, 2000);
	    //...
    }
}

function loadNewContent(url, bool){
	var newSectionName = url.replace('.html', '');
  	var section = $('<div class="ajax"></div>');

  	section.load( url + ' .content', function(event){
  		console.log('load new content and replace old content with the new one');
  		// load new content and replace old content with the new one

      	$('#main').html(section);
      	//Animate new content
      	setTimeout(function() {
      		$('.container_composition').toggleClass('covered');
      	}, 600);
      	//...


      	//Update history
      	if(url != window.location){
        	//add the new page to the window.history
        	window.history.pushState({path: url},'',url);
      	}
  	});

}