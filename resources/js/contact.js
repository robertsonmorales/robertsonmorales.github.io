$(() => {
  'use strict';

  $('#btn-submit').on('click', function(){
    let input = $('.form-control');
    for (let i = 0; i < input.length; i++) {
        isEmpty(input[i].value, input[i].id, input[i].name);
    }
  });

  function isEmpty(input, id, name){
    let newName = name.replace('_', ' ');
    if  (input == "" || input == null || input == undefined){
      $('#validate-'+id).addClass('d-block');
      $('#validate-'+id).html('The ' + newName + ' is a required field.');
    }else{
      $('#validate-'+id).removeClass('d-block');
    }
  }

  function ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(myForm.emailAddr.value)){
      return true;
    }else{
      alert("You have entered an invalid email address!");
      return (false);
    }
      
  }
});