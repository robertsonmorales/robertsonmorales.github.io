feather.replace();

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

$(() => {
    'use strict';

    var date = new Date();
    $('#year').html(date.getFullYear());

    $(document).on('scroll', function () {
        $("#navbar").toggleClass('border-bottom', $(this).scrollTop() > $("#navbar").height());
        $("#navbar").toggleClass('bg-white', $(this).scrollTop() > $("#navbar").height());
	});

    $('#btn-call').click(function(){
        window.location.href = "tel:639552808438";
    });
});