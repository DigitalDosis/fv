var isAnimating = false;
var isBackwards = false;
var newPage;
var currentPage;
var sections = { 
	index : {
		animationTimeEnter: 1000,
		animationTimeExit: 1000,
		animationFunctionEnter: function() { homeAnimationEnter(); },
		animationFunctionExit: function() { homeAnimationExit(); }
	},
	hub : {
		animationTimeEnter: 2000,
		animationTimeExit: 1000,
		//animationTimeExitToBack: 1000
		animationFunctionEnter: function() { hubAnimationEnter(); },
		animationFunctionExit: function() { hubAnimationExit(); },
		animationFunctionEnterFromBack: function() { hubAnimationEnterFromBack(); },
		animationFunctionExitToBack: function() { hubAnimationExitToBack(); }
	},
	landing: {
		animationTimeEnter: 1000,
		animationTimeExit: 2600,
		animationFunctionEnter: function() { landingAnimationEnter() },
		animationFunctionExit: function() { landingAnimationExit() } 
	}
};


$(document).ready(function() {
	var pageArray = location.pathname.split('/');
	currentPage = pageArray[pageArray.length - 1].replace('.html', '');

	$('body').on('click', '[data-type="page-transition"]', function(event){
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

	//toggle menu
	$('.hamburger').on('click', function(){
		$(this).toggleClass('is-active');
		$('.main-menu-container').toggleClass('show');
		$('.content').toggleClass('menu-visible');
	});

	initSwiperMenu();

	//landing text block
	$('.arrow-down').on('click', function(){
		var step = $('.block-cover').height();
		$('.content-landing').css('bottom', step + 'px');
	});

	//scroll step landing
	jQuery('.block-section').scroll(function() {
	    var st = jQuery(this).scrollTop();
	    if(st < 1){
	        jQuery('.content-landing').css('bottom', 0 + 'px');
	    }
	});


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

    if( isBackwards == true && newSectionName == 'index' ){
		sections[currentPage].animationFunctionExitToBack();
    }else{
    	sections[currentPage].animationFunctionExit();
    }

	setTimeout(function() {
		currentPage = newSectionName;
		loadNewContent(url);

	}, sections[currentPage].animationTimeExit);

}

function loadNewContent(url){
  	var section = $('<div class="ajax"></div>');

  	section.load( url + ' .content', function(event){
		  
		$(section).find('.layer-mask').addClass('SlideInUp');
		if( isBackwards ){
			$(section).find('.layer').addClass('covered');
			$(section).find('.container_composition').removeClass('covered');
		};
      	
		$('#main').html(section);
		$('.main-menu-container').removeClass('show');
		$('.hamburger').removeClass('is-active');

      	setTimeout(function() {
      		if( isBackwards == true && currentPage == 'hub' ){
		        sections[currentPage].animationFunctionEnterFromBack();
      		}else{
      			sections[currentPage].animationFunctionEnter();
      		}
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

	initSliderHome();
	$('header, footer').removeClass('grey');
	$('.layer-mask').removeClass('SlideInUp');
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

	$('.layer').toggleClass('covered');
};

var hubAnimationEnterFromBack = function () {
	console.log('EnterFromBack => transicion de entrada a hub desde landing');

	initSliderHub();
};

var hubAnimationExitToBack = function () {
	console.log('ExitToBack => transicion de salida de hub a entrada index');

	$('.container_composition').toggleClass('covered');
	$('header, footer').removeClass('grey');
};

var landingAnimationEnter = function () {
	console.log("landing Enter");

	$('.image-mask-layer').addClass('scale');
	$('.container-text').addClass('showed');
	setTimeout(function(){
		$('.cover').removeClass('start');
	}, 900);
	$('header, footer').removeClass('grey').addClass('white');
};

var landingAnimationExit = function () {
	console.log("landing Exit");

	$('.image-mask-layer').removeClass('scale');
	$('.container-text').removeClass('showed');
	$('header, footer').removeClass('white').addClass('grey');
};

function initSliderHome(){
    var swiperHome = new Swiper('.swiper-home', {
	    speed: 600,
	    autoplay: 1000,
	    direction: 'vertical',
	    wrapperClass: 'swiper-home_wrapper',
	    slideClass: 'swiper-home_slide',
	    slideActiveClass: 'swiper-home_slide-active',
	    slideNextClass: 'swiper-home_slide-next',
	    slidePrevClass: 'swiper-home_slide-prev',
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
			       $('.layer').removeClass('covered');
			    }
            });
        	

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
