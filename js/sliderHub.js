$(document).ready(function() {

    $('#nav').smoothState({
        //prefetch: true,
        //repeatDelay: 1000,
        cacheLength: 0,
        onStart: {
            duration: 2000,
            render: function(url, $container) {
                $('.layer').addClass('covered');
                //$('header, footer').toggleClass('light');
                //$('.layer-mask').toggleClass('SlideInUp');
            }
        },
        onAfter: function($container, $newContent) {
             $('.image-mask-layer').addClass('scale');
        },
       /* onBefore: function($currentTarget, $container) {
            $container.find('.text-content').removeClass('shown');
        }*/

    });

    

});


