feather.replace()


function navSelected(id){
    let navbar = document.getElementsByClassName('navbar');
    for (let i = 0; i < navbar.length; i++) {
        if (navbar[i].classList.contains('active')) {
            navbar[i].classList.remove('active');   
        }
    }

    let el = document.getElementById(id);
    el.classList.add('active');
}

$(() => {
    'use strict';

    $(document).on('load', function(){
        $(this).scrollTop();
    });

    $(document).on('scroll', function () {
        $("#navbar").toggleClass('shadow-sm', $(this).scrollTop() > $("#navbar").height());
        $("#navbar").toggleClass('fixed-top', $(this).scrollTop() > $("#navbar").height());

        if($("#navbar").hasClass('bg-white')){
            $("#navbar").removeClass('bg-dark');
            $("#navbar").addClass('bg-white', $(this).scrollTop() > $("#navbar").height());
        }else if($("#navbar").hasClass('bg-dark')){
            $("#navbar").removeClass('bg-white');
            $("#navbar").addClass('bg-dark', $(this).scrollTop() > $("#navbar").height());
        }
	});

    $('#dark-light-mode').on('click', function(){
        $('body').toggleClass('bg-dark');
        $('.media-icon-facebook').toggleClass('text-white');
        $('.media-icon-linkedin').toggleClass('text-white');
        $('.media-icon-mail').toggleClass('text-white');
        $('.media-icon-github').toggleClass('text-white');

        if($('#navbar').hasClass('bg-white')){
            $('#navbar').removeClass('bg-white');
            $('#navbar').addClass('bg-dark');
        }else if($('#navbar').hasClass('bg-dark')){
            $('#navbar').removeClass('bg-dark');
            $('#navbar').addClass('bg-white');
        }

        $('.text-dark-mode').toggleClass('text-white');
        $('.dark-theme').toggleClass('d-none');
        $('.light-theme').toggleClass('d-none');
    });

    

    $('.shrink').hover(function(){
        
    });

    let noOfString = $('.shrink').text().trim();
    let splitString = noOfString.split(' ').join('');
    for (let i = 0; i < splitString.length; i++) {
        let createElement = document.createElement('span')
        createElement.setAttribute('class', splitString[i]);
        createElement.append(splitString[i]);

        console.log(createElement.classList);
        // $('.'+createElement.classList).hover(function(){
        //     alert($(this).text());
        // });
    }
});