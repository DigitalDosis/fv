var activeSlide = 0;
var isAnimating = false;

$(document).ready(function() {





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