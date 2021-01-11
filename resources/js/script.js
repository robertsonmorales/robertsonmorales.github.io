feather.replace()

function navSelected(id){
    let navbar = document.getElementsByClassName('navbar');
    for (let i = 0; i < navbar.length; i++) {
        navbar[i].classList.remove('nav-selected');
    }

    let el = document.getElementById(id);
    el.classList.add('nav-selected');
    let html = document.querySelectorAll('html')[0].classList.contains('dark-mode');
    if(html){
        el.classList.add('dark-mode-revert');
    }else{
        el.classList.remove('dark-mode-revert');
    }
}

$(() => {
    'use strict';

    $(document).on('scroll', function () {
        $("#navbar").toggleClass('shadow-sm', $(this).scrollTop() > $("#navbar").height());
	});

    $('#dark-light-mode').on('click', function(){
        $('html').toggleClass('dark-mode');
        $('.media-icons').toggleClass('dark-mode-revert');
        $('.img-fluid').toggleClass('dark-mode-revert');
        $('.text-primary').toggleClass('dark-mode-revert');
        $('.btn-primary').toggleClass('dark-mode-revert');

        if($('html').hasClass('dark-mode')){
            $('.nav-selected').addClass('dark-mode-revert');
        }else{
            $('.nav-selected').removeClass('dark-mode-revert');
        }

        $('.dark-theme').toggleClass('d-none');
        $('.light-theme').toggleClass('d-none');
    });

    $('#name').on('keyup', function(){
        validator('name', $(this).val());
    });

    $('#email').on('keyup', function(){
        validator('email', $(this).val());
    });

    $('#address').on('keyup', function(){
        validator('address', $(this).val());
    });

    $('#message').on('keyup', function(){
        validator('message', $(this).val());
    });

    function validator(inputName, inputValue){
        let value = inputValue.trim();
        
        if(value == null || value == undefined || value == ""){
            $('#error-'+inputName).html(inputName.charAt(0).toUpperCase() + inputName.substr(1) + ' field is required.');
        }else{
            $('#error-'+inputName).empty();
        }
    }

    $('#btn-submit').on('click', function(event){
        event.preventDefault()
        var name = validator('name', $('#name').val());
        var email = validator('email', $('#email').val());
        var address = validator('address', $('#address').val());
        var message = validator('message', $('#message').val());

        if(name && email && address && message){
            $(this).prop('disabled', true);
            $('#submit-message').html('Submitting Message..');
            $('#spinner').removeClass('d-none');
        }
    });
});