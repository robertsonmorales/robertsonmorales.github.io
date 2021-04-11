$(() => {
  'use strict';

  $('#contact-form').on('submit', function(event){
    event.preventDefault();

    let name = isEmpty($('#name').val(), $('#name').attr('id'), $('#name').attr('name'));
    let emailAddress = isEmpty($('#email_address').val(), $('#email_address').attr('id'), $('#email_address').attr('name'));
    let subject = isEmpty($('#subject').val(), $('#subject').attr('id'), $('#subject').attr('name'));
    let message = isEmpty($('#message').val(), $('#message').attr('id'), $('#message').attr('name'));

    let validateEmailAddress = validateEmail($('#email_address').val());

    if(!name && !emailAddress && !subject && !message && !validateEmailAddress){
      $('#btn-submit .mr-2').html('SENDING..');
    }
  });

  function isEmpty(input, id, name){
    let newName = name.replace('_', ' ');
    if  (input == "" || input == null || input == undefined){
      $('#validate-'+id).addClass('d-block');
      $('#validate-'+id).html('The ' + newName + ' is a required field.');
      return true;
    }else{
      $('#validate-'+id).removeClass('d-block');
      return false;
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