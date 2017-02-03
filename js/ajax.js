var isAnimating = false;
var isBackwards = false;
var newPage;
var currentPage;
var sections = { 
	index : {
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
	currentPage = pageArray[pageArray.length - 1].replace('.html', '');

	$('#main').on('click', '[data-type="page-transition"]', function(event){
	    event.preventDefault();

		isBackwards = false;

	    //detect which page has been selected
	    newPage = $(this).attr('href');
	    //if the page is not animating - trigger animation
	    if( !isAnimating ) changePage(newPage);
	});


	window.addEventListener('popstate', function(event) {
		var newPageArray = location.pathname.split('/'),
	        newPage = newPageArray[newPageArray.length - 1];

		isBackwards = true;

		changePage(newPage);
	});


	$('.hamburger').on('click', function(){
		$(this).toggleClass('is-active');
		$('.main-menu-container').toggleClass('show');
	});

	initSwiperMenu();


});

function initSwiperMenu(){
	//Initialize SwiperMenu
	var swiperMenu = new Swiper('.nav-menu-items-container', {
        initialSlide: 1,
        parallax: true,
        grabCursor: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: true,
        speed: 900,
        spaceBetween: 25,
		/*  onTouchMoveOpposite: function (swiper, e){
        	console.log(swiper);
        	console.log(swiper.touches.startY + 'start  ');
        	console.log(swiper.touches.currentY + 'current  ');
        }, */
       onSlideChangeStart: function(swiperMenu){
        	$('.nav-main-menu-container li').removeClass('high');
        	var navHigh = '#' + swiperMenu.activeIndex;
        	$( navHigh ).addClass('high');
        }
    });

	//nav-menu slide pagination
	$('.nav-main-menu-container li').on('mouseenter', function(){
        var el = $(this).attr('id');
        swiperMenu.slideTo(el);
    });

	//Add effects on active-slide
    $( '.nav-main-menu-container li' ).hover(
	  function() {
	  	$( '.nav-main-menu-container li').not($( this ) ).css('opacity', 0.3);
	    $( this ).addClass( 'high' );
	    $('.nav-menu-items-container .swiper-slide').not( $('.swiper-slide-active') ).css('opacity', 0.5);
	    $('.nav-menu-items-container .swiper-slide-active').css('opacity', 1);
	  }, function() {
	  	$( '.nav-main-menu-container li').css('opacity', 1);
	    $( this ).removeClass( 'high' );
	  }
	);
	
}

function changePage(url) {
	var newSectionName = url.replace('.html', '');

	currentPage === "" ? currentPage = 'index' : currentPage;
	newSectionName === "" ? newSectionName = 'index' : newSectionName;

    isAnimating = true;
	sections[currentPage].animationFunctionExit();
	setTimeout(function() {
		currentPage = newSectionName;
		loadNewContent(url);

	}, sections[currentPage].animationTimeExit);

}

function loadNewContent(url){
  	var section = $('<div class="ajax"></div>');

  	section.load( url + ' .content', function(event){
		  
		$(section).find('.layer-mask').addClass('SlideInUp');
      	
		$('#main').html(section);

      	setTimeout(function() {
      		sections[currentPage].animationFunctionEnter();
			//Si hemos terminado la animación de entrada
			setTimeout(function() {
				isAnimating = false;
			}, sections[currentPage].animationTimeEnter);
      	}, 600);

      	//Update history
      	if( !isBackwards ){
        	window.history.pushState({ path: url }, currentPage, url);
      	}

  	});

}

/** Animation callbacks **/

var homeAnimationEnter = function () {
	console.log("home Enter");

	$('header, footer').toggleClass('grey');
	$('.layer-mask').removeClass('SlideInUp');
	//initSliderHome();
};

var homeAnimationExit = function () {
	console.log("home Exit");
	
	$('header, footer').toggleClass('grey');
	$('.layer-mask').toggleClass('SlideInUp');
};

var hubAnimationEnter = function () {
	console.log("hub Enter");
	initSliderHub();
};

var hubAnimationExit = function () {
	console.log("hub Exit");

	$('.container_composition').toggleClass('covered');
};

var landingAnimationEnter = function () {
	console.log("landing Enter");

/*	$('.image-mask-layer').toggleClass('scale');
	$('header, footer').removeClass();
	$('header, footer').addClass('white');*/
};

var landingAnimationExit = function () {
	console.log("landing Exit");
};

function initSliderHome(){
    var swiperHome = new Swiper('.swiper-home', {
	    speed: 600,
	    autoplay: 1000,
	    direction: 'vertical',
	    //effect: 'fade',
	    //containerModifierClass: 'swiper-home',
	    wrapperClass: 'swiper-home_wrapper',
	    slideClass: 'swiper-home_slide',
	    slideActiveClass: 'swiper-home_slide-active',
	    slideNextClass: 'swiper-home_slide-next',
	    slidePrevClass: 'swiper-home_slide-prev',
	    /*onInit: function(){
			       
			    }*/
	});
}

function initSliderHub(){
	 var swiperHub = new Swiper('.swiper-hub', {
                wrapperClass: 'swiper-hub_wrapper',
                slideClass: 'swiper-hub_slide',
                slideActiveClass: 'swiper-hub_slide-active',
                slideNextClass: 'swiper-hub_slide-next',
                slidePrevClass: 'swiper-hub_slide-prev',
                nextButton: '.swiper-hub_button-next',
                prevButton: '.swiper-hub_button-prev',
                speed: 600,
                loop: true,
                observer: true,
                observeParents: true,
                onSlideChangeStart: function (swiper) {
                            console.log('slide change start - before');
                            console.log(swiper);
                            console.log(swiper.activeIndex);
                            //before Event use it for your purpose
                },
                onSlideChangeEnd: function(swiper){
                        console.log('slide change start - end');
                        $('.container_composition').removeClass('covered');
                },
                pagination: '.hub-pagination',
                paginationClickable: true,
                paginationBulletRender: function (swiper, index, className) {
                      return '<span class="' + className + '">0' + (index + 1) + '</span>';
                },
                onInit: function(){
			       $('.container_composition').removeClass('covered');
			    }
            });
        	
             //var mySwiperHub = $('.swiper-hub')[0].swiper;
             //mySwiperHub.update();
             swiperHub.lockSwipes();

             //events actions sliderHub functions
			$('.swiper-hub_button-next').click(function() {
		        $('.container_composition').addClass('covered');
		        setTimeout(function() {
		          swiperHub.unlockSwipes();
		          swiperHub.slideNext();
		          swiperHub.lockSwipes();
		        }, 2000);
		    });

		    $('.swiper-hub_button-prev').click(function() {
		        $('.container_composition').addClass('covered');
		        setTimeout(function() {
		          swiperHub.unlockSwipes();
		          swiperHub.slidePrev();
		          swiperHub.lockSwipes();
		        }, 2000);
		    });

		    $('.swiper-pagination-bullet').click(function() {
		        $('.container_composition').addClass('covered');
		        var slideNumber = $(this).html();
		        console.log(slideNumber);
		        setTimeout(function() {
		          swiperHub.unlockSwipes();
		          swiperHub.slideTo(slideNumber);
		          swiperHub.lockSwipes();
		        }, 2000);
		    });
}
