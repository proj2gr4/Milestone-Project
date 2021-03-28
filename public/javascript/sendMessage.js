$(document).ready(function(){
    $("#form-submit").click(function(){
      if (($('#name').val()) && ($('#email').val()) && ($('#message').val())){
      event.preventDefault()
      $("#homepageMessageModal").modal();
      };
    });
    $("#close").click(function(){
      $('#name').val('');
      $('#email').val('');
      $('#message').val('');
    });
  });