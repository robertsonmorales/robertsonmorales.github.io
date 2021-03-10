function navSelected(id){
    let navbar = document.getElementsByClassName('navbar');
    for (let i = 0; i < navbar.length; i++) {
        if (navbar[i].classList.contains('active')) {
            navbar[i].classList.remove('active');   
        }
    }

    let el = document.getElementById(id);
    if (id == 'about') {
        window.scrollTop;
    }else{
        el.scrollIntoView();
    }
    document.getElementById('nav-'+id).classList.add('active');
}

$(() => {
    'use strict';

    $(document).on('load', function(){
        $(this).scrollTop();
    });

    $(document).on('scroll', function () {
        // if($('#navbar').hasClass('bg-light')){
        //     $("#navbar").toggleClass('nav-shadow', $(this).scrollTop() > $("#navbar").height());
        // }
        
        // if($('#navbar').hasClass('bg-dark')){
        //     $("#navbar").toggleClass('nav-shadow-dark', $(this).scrollTop() > $("#navbar").height());
        // }

        if($("#navbar").hasClass('bg-light')){
            $("#navbar").removeClass('bg-dark');
            $("#navbar").addClass('bg-light', $(this).scrollTop() > $("#navbar").height());
        }else if($("#navbar").hasClass('bg-dark')){
            $("#navbar").removeClass('bg-light');
            $("#navbar").addClass('bg-dark', $(this).scrollTop() > $("#navbar").height());
        }
	});

    $('#dark-light-mode').on('click', function(){
        $('body').toggleClass('bg-dark');       

        $('.card-dark').toggleClass('bg-dark');
        $('.card-title-ext').toggleClass('text-light');
        $('.card-text-ext').toggleClass('text-light');

        $('.badge').toggleClass('dark-badge');

        if($('#navbar').hasClass('bg-light')){ // to dark-mode
            $('#navbar').removeClass('bg-light');
            $('#navbar').addClass('bg-dark');

            $('.bg-mode').removeClass('bg-primary');
            $('.bg-mode').addClass('bg-light');

            $('.img-dark-mode').removeClass('flat');
            $('.img-dark-mode').addClass('flat-dark');

            $('.source-code').removeClass('text-dark');
            $('.source-code').addClass('text-muted');

            $('#g-map').css('filter', 'invert(100%)');
        }else if($('#navbar').hasClass('bg-dark')){ // to light-mode
            $('#navbar').removeClass('bg-dark');
            $('#navbar').addClass('bg-light');

            $('.bg-mode').addClass('bg-primary');
            $('.bg-mode').removeClass('bg-light');

            $('.img-dark-mode').addClass('flat');
            $('.img-dark-mode').removeClass('flat-dark');

            $('.source-code').addClass('text-dark');
            $('.source-code').removeClass('text-muted');

            $('#g-map').css('filter', 'invert(0%)');
        }

        $('.text-dark-mode').toggleClass('text-light');
        $('.dark-theme').toggleClass('d-none');
        $('.light-theme').toggleClass('d-none');
    });

    function navBarHeight(){
        $('#skills').css('height', ($('#navbar').height() + 40) + 'px');
        $('#services').css('height', ($('#navbar').height() + 40) + 'px');
        $('#portfolio').css('height', ($('#navbar').height() + 40) + 'px');
        $('#contact').css('height', ($('#navbar').height() + 40) + 'px');
    }    

    function getHeader(){
        let hashPath = window.location.hash;
        if (hashPath == "" || hashPath == null || hashPath == undefined){
            $('#nav-about').addClass('active');
            window.scrollTop;
        }else{
            for (let i = 0; i < $('.nav-link').length; i++) {
                $('.nav-link')[i].classList.remove('active');
            }

            let path = hashPath.split('#')[1];
            if (path == 'nav-about') {
                window.scrollTop;
            }

            $('#nav-'+path).addClass('active');
        }
    }

    navBarHeight();
    getHeader();
});