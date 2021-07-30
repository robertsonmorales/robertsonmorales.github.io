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
        $('#about').css('height', $('#navbar').height() + "px");
        $('#services').css('height', $('#navbar').height() + "px");
        $('#projects').css('height', $('#navbar').height() + "px");       
        $('#skills').css('height', $('#navbar').height() + "px");
        $('#contact').css('height', $('#navbar').height() + "px");
    }   

    navBarHeight(); 
});