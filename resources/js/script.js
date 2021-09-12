feather.replace();

window.scrollTo(0,0);

function navSelected(id){
    let navbar = document.getElementsByClassName('navbar');
    for (let i = 0; i < navbar.length; i++) {
        if (navbar[i].classList.contains('active')) {
            navbar[i].classList.remove('active');   
        }
    }

    let el = document.getElementById(id);
    if (id == 'home') {
        document.getElementById('nav-home').classList.add('active');
        window.scrollTo(0,0);
    }else{
        el.scrollIntoView();
    }
    
    document.getElementById('nav-'+id).classList.add('active');
}

$(() => {
    'use strict';

    var date = new Date();
    $('#year').html(date.getFullYear());

    $(document).on('scroll', function () {
        $("#navbar").toggleClass('border-bottom', $(this).scrollTop() > $("#navbar").height());
        $("#navbar").toggleClass('bg-white', $(this).scrollTop() > $("#navbar").height());
	});

    function navBarHeight(){
        var set_height = $('#navbar').height() * 2;
        $('#about').css('margin-top', set_height + "px");
        $('#services').css('margin-top', set_height + "px");
        $('#projects').css('margin-top', set_height + "px");
        $('#skills').css('margin-top', set_height + "px");
        $('#contact').css('margin-top', set_height + "px");
    }   

    navBarHeight(); 
});