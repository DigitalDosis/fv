var activeSlide = 0;
var isAnimating = false;
var clase;
//var swiperHub;

$(document).ready(function() {

    $('#home').smoothState({
        //prefetch: true,
        //repeatDelay: 1000,
        debug: true,
        cacheLength: 0,
        onBefore: function($currentTarget, $container) {
            targetClicked = $currentTarget.parent(".btn").length > 0;
          if(targetClicked){ 
            clase = 'white';
          }else{ 
            clase = 'grey';
          }
          console.log(clase + 'clase');

            console.log($currentTarget + 'current');
            console.log(JSON.stringify($currentTarget));

            $('header, footer').removeClass();
            $('header, footer').addClass(clase);

            $('.layer-mask').toggleClass('SlideInUp');
        },
        onStart: {
            duration: 1500,
            render: function(url, $container) {
                
                $('.container_composition').toggleClass('covered');
            }


        },
        onAfter: function($container, $newContent) {
            //swiperHub.update();

                 $('.container_composition').toggleClass('covered');
                 //$('.layer-mask').removeClass('SlideInUp');
                    //init hub slider
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
                }
            });

                

        //setTimeout(function() {
            $('.image-mask-layer').addClass('scale');
        //}, 300);

        }

    });



/*    $('.cover p:after').on('click', function(){

    });*/

});

function swiperOnSliderMove(swiper){
    console.log('slide change start - before');
}
