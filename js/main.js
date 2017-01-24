var activeSlide = 0;
var isAnimating = false;

$(document).ready(function() {

    //init home slider
    var swiperHome = new Swiper('.swiper-home', {
        speed: 3000,
        effect: 'fade',
        //containerModifierClass: 'swiper-home',
        wrapperClass: 'swiper-home_wrapper',
        slideClass: 'swiper-home_slide',
        slideActiveClass: 'swiper-home_slide-active',
        slideNextClass: 'swiper-home_slide-next',
        slidePrevClass: 'swiper-home_slide-prev'
    });

    $('#home').smoothState({
        //prefetch: true,
        //repeatDelay: 1000,
        onStart: {
            duration: 1000,
            render: function(url, $container) {
                $('header, footer').toggleClass('light');
                $('.layer-mask').toggleClass('SlideInUp');
            }
        },
        onAfter: function($container, $newContent) {
             $('.container_composition').removeClass('covered');
             //$('.layer-mask').removeClass('SlideInUp');
        },
       /* onBefore: function($currentTarget, $container) {
            $container.find('.text-content').removeClass('shown');
        }*/

    });

});