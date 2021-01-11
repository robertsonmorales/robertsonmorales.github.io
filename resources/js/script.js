feather.replace()

function navSelected(id){
    let navbar = document.getElementsByClassName('navbar');
    for (let i = 0; i < navbar.length; i++) {
        navbar[i].classList.remove('nav-selected');
    }

    let el = document.getElementById(id);
    el.classList.add('nav-selected');
}

$(() => {
    function getAge() {
        var today = new Date();
        var birthDate = new Date('09/27/1999');
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age = age - 1;
        }

        $('#my-age').html(age);
    }

    getAge();

    $(document).on('scroll', function () {
        $("#navbar").toggleClass('shadow-sm', $(this).scrollTop() > $("#navbar").height());
        // $("#navbar").toggleClass('scrolled', $(this).scrollTop() > $nav.height());
	});

    $('#dark-light-mode').on('click', function(){
        $div = $('html');
        $div.toggleClass('dark-mode');
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