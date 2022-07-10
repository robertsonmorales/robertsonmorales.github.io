$(() => {
  'use strict';

  var htmlContent = '';
  var offeredService = $('.card-title');
  for (let i = 0; i < offeredService.length; i++) {
    var services = offeredService[i].textContent;
    var elName = services.split(' ').join('_').toLowerCase();

    htmlContent += '<div class="custom-control custom-checkbox">\
      <input type="checkbox" name="services[]" class="custom-control-input" id="'+elName+'" value="'+services+'">\
      <label class="custom-control-label" for="'+elName+'">'+services+'</label>\
    </div>';
  }

  $('#offered-services').prepend(htmlContent);

  $('#contact-form').on('submit', function(event){
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
      ajaxRequest();
    }
  });

  function ajaxRequest(){
    var url = $('#contact-form').attr('action');
    var httpMethod = $('#contact-form').attr('method');
    var data = {
      first_name: $('#first_name').val(),
      last_name: $('#last_name').val(),
      email_address: $('#email_address').val(),
      phone_number: $('#phone_number').val(),
      services: $('input[name="services[]"]').val(),
      message: $('#message').val()
    };
    
    $.ajax({
      url: url,
      type: httpMethod,
      data: data,
      beforeSend: () => {
        $('#btn-submit').css('cursor', 'not-allowed')
        .prop('disabled', true)
        .html('Sending Message...');
        $('.form-control').css('cursor', 'not-allowed')
        .prop('disabled', true);
        $('.custom-control-input').css('cursor', 'not-allowed')
        .prop('disabled', true);
      },
      success: (result, status, xhr) => {
        console.log(result);
        if(xhr.status == 200 && status == "success"){ // Http OK
          if(result.is_success){
            // alert(result.message);
            $('#contact-form .form-control').val("");
            $('#contact-form .custom-control-input').attr("checked", false);
          }else{
            alert(result.message);
          }
        }
      },
      error: (xhr, status, error) => {
        console.log('e-xhr', xhr);
        console.log('e-status', status);
        console.log('e-error', error);
      }
    });
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
});