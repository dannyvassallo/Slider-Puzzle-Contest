$(function(){
  // run after form submit
  var after_submit = function(form){
    $("#ss-form").css("display","none");
    $(".remodal-confirm.modal-ok-style").css("display", "visible");
    ga('send', 'event', 'Puzzle', 'Form', 'Submitted');
    form.submit();    
  }

  // wait for $.valiator to be loaded
  var t = setInterval(function(){
    // keep waiting if $.validator hasn't loaded yet
    if(!$.validator) return;
    clearInterval(t);

    //    custom validators
    var notplaceholder  = function(value, element, params){
      return value != $(element).attr("placeholder");
    };
    var valid_zipcode   = function(value, element, params) {
      return this.optional(element) || /^\d{5}(?:-\d{4})?$/.test(value);
    };

    jQuery.validator.addMethod("notplaceholder", notplaceholder, "This field is required.");
    jQuery.validator.addMethod("zipcode", valid_zipcode, "Please provide a valid zipcode.");
    // .. custom validators ..

    // do the validate
    $("#ss-form").validate({
      // customize submit action
      "submitHandler": after_submit,

      // don't check validate on these actions
      "onfocusout": false,
      "onkeyup":    false,
      "onclick":    false,

      "rules": {
        // email
        "entry.1.single": {
          "notplaceholder": true,
          "email":          true
        }
      }
    });
  },1);



});


//BEGIN//

$(function(){
  $("#begin , #overlay").on('click', function(){
    $("#overlay").fadeOut( 'slow' );
    ga('send', 'event', 'Puzzle', 'Game', 'New Game');
  });
});




