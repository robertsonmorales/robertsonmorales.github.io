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

    function navSelected(id) {
        // Get all of the navbar elements
        let navbars = $(".navbar");
        
        // Remove the "active" class from all of the navbar elements
        navbars.removeClass("active");
        
        // Get the element with the ID of id
        let el = $("#" + id);
        
        // If id is equal to "hero", then scroll to the top of the page
        if (id === "hero") {
            window.scrollTo(0, 0);
        } else {
        // Otherwise, add the "active" class to the navbar element with the ID of id and scroll the element into view
        $("#nav-" + id).addClass("active");
            el.scrollIntoView();
        }
    }
    
    $('#year').html(date.getFullYear());

    $(document).on('scroll', function () {
        // $("#navbar").toggleClass('border-bottom', $(this).scrollTop() > $("#navbar").height());
        $("#navbar").toggleClass('glassmorphism', $(this).scrollTop() > $("#navbar").height());
	});

    $('#btn-call').click(function(){
        window.location.href = "tel:639552808438";
    });
});