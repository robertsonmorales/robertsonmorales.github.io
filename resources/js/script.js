feather.replace();

// window.scrollTo(0,0);

function navSelected(id){
    let navbar = document.getElementsByClassName('navbar');
    for (let i = 0; i < navbar.length; i++) {
        if (navbar[i].classList.contains('active')) {
            navbar[i].classList.remove('active');   
        }
    }

    let el = document.getElementById(id);
    if (id == 'hero') {
        document.getElementById('nav-hero').classList.add('active');
        window.scrollTo(0,0);
    }else{
        document.getElementById('nav-'+id).classList.add('active');
        el.scrollIntoView();
    }
}

function visibleToViewport(el){
    var rect = el.getBoundingClientRect();

    // return rect;
    return (
        rect.top == 0 &&
        rect.left == 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// const navs = ['hero', 'services', 'works', 'skills', 'about', 'contact'];

var message = {};

document.addEventListener('scroll', () => {
    message = {
        visibiliy: visibleToViewport(document.getElementById('works')) 
            ? 'Visible to viewport'
            : 'Not Visible to viewport',
        rect: document.getElementById('services').getBoundingClientRect()
    }

    // console.log(message);
});

$(() => {
    'use strict';

    var date = new Date();
    $('#year').html(date.getFullYear());

    $(document).on('scroll', function () {
        $("#navbar").toggleClass('border-bottom', $(this).scrollTop() > $("#navbar").height());
        $("#navbar").toggleClass('bg-color', $(this).scrollTop() > $("#navbar").height());
	});

    function navBarHeight(){
        var set_height = $('#navbar').height() * 2;
        $('#about').css('margin-top', set_height + "px");
        $('#services').css('margin-top', set_height + "px");
        $('#projects').css('margin-top', set_height + "px");
        $('#skills').css('margin-top', set_height + "px");
        $('#contact').css('margin-top', set_height + "px");
    }   

    // navBarHeight(); 
});