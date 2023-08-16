$(() => {
  'use strict';

  var htmlContent = '';
  var offeredService = $('.card-title');
  for (let i = 0; i < offeredService.length; i++) {
    var services = offeredService[i].textContent;
    var elName = services.split(' ').join('_').toLowerCase();

    htmlContent += '<label class="custom-control custom-checkbox">\
      <input type="checkbox" name="services[]" class="custom-control-input" id="'+elName+'" value="'+services+'">\
      <span class="custom-control-label" for="'+elName+'">'+services+'</span>\
    </label>';
  }

  function getServices(){
    let services = $('input[name="services[]"]');
    let get = [];

    for (let i = 0; i < services.length; i++) {
      const element = services[i];

      if(element.checked){
        get.push(element.defaultValue)
      }
    }

    let list = get.join(', ');
    
    return list;
  }

  function isEmpty(input, id, name){
    let newName = name.replace('_', ' ');
    if  (input == "" || input == null || input == undefined){
      $('#'+id).addClass('is-invalid');
      $('#validate-'+id).text('The ' + newName + ' is a required field.').addClass('d-block');
    }else{
      $('#'+id).removeClass('is-invalid');
      $('#validate-'+id).removeClass('d-block');
    }
  }

  function validateEmail(email) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(regexEmail)) {
      $('#validate-email_address').addClass('d-block');
      $('#validate-email_address').html('Invalid email address.');

      return true;
    }else{
      $('#validate-email_address').removeClass('d-block');

      return false;
    }
  }

  function letsGetStarted(){
    let url = $('#contact-form').attr('action');
    let httpMethod = $('#contact-form').attr('method');
    let data = {
      FirstName: $('#first_name').val(),
      LastName: $('#last_name').val(),
      EmailAddress: $('#email_address').val(),
      MobileNo: $('#phone_number').val(),
      Services: getServices(),
      Message: $('#message').val()
    };

    fetch(url, {
      method: httpMethod,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then( (response) =>  {
        $('#btn-submit')
          .css('cursor', 'not-allowed')
          .prop('disabled', true);
        $('.form-control')
          .css('cursor', 'not-allowed')
          .prop('disabled', true);
        $('.custom-control-input')
          .css('cursor', 'not-allowed')
          .prop('disabled', true);

        $.getJSON("https://api.ipify.org?format=json", function(data) {
          var ipAddress = data.ip;
          sessionStorage.setItem('IP', ipAddress);
        });

        window.location.href = "/success.html";
      })
      .catch(function (error) {
        window.location.href = "/error.html";
      });
  }

  $('#offered-services').prepend(htmlContent);

  $('#phone_number').on('input', function() {
    let inputValue = $(this).val();
    
    if (inputValue.length <= 14) {
      let numericValue = inputValue.replace(/[^0-9]/g, '');
      $(this).val(numericValue);
    } else {
      let truncatedValue = inputValue.slice(0, 14);
      let numericTruncatedValue = truncatedValue.replace(/[^0-9]/g, '');
      $(this).val(numericTruncatedValue);
    }
  });

  $('#btn-submit').click(function(event){
    event.preventDefault();
    
    var counter = [];
    var myServices = $('input[name="services[]"]');
    for (let j = 0; j < myServices.length; j++) {
      var isChecked = myServices[j].checked;
      counter.push(isChecked);
    }

    var noSelectedService = counter.find((el) => el == true);
    if(noSelectedService){
      
      $('#validate-subject').text("").removeClass('d-block');
    }else{
      $('#validate-subject').text("Please select at least one.").addClass('d-block');
    }

    let firstName = isEmpty($('#first_name').val(), $('#first_name').attr('id'), $('#first_name').attr('name'));
    let lastName = isEmpty($('#last_name').val(), $('#last_name').attr('id'), $('#last_name').attr('name'));
    let emailAddress = isEmpty($('#email_address').val(), $('#email_address').attr('id'), $('#email_address').attr('name'));
    let phoneNumber = isEmpty($('#phone_number').val(), $('#phone_number').attr('id'), $('#phone_number').attr('name'));
    let message = isEmpty($('#message').val(), $('#message').attr('id'), $('#message').attr('name'));
    let validateEmailAddress = validateEmail($('#email_address').val());

    if(!firstName && !lastName && !phoneNumber && !emailAddress && !message && !validateEmailAddress){
      letsGetStarted();
    }
  });
});