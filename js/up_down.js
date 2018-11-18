function upDown(up) {

  //console.log(Math.round(total));
  var percent_number_step = $.animateNumber.numberStepFactories.append(" m");
  $("#uphill").animateNumber(
    {
      number: up[0],
      easing: "easeInQuad",

      numberStep: percent_number_step
    },
    1000
  );
  
  
  var percent_number_step = $.animateNumber.numberStepFactories.append(" m");
  $("#downhill").animateNumber(
    {
      number: up[1],
      easing: "easeInQuad",

      numberStep: percent_number_step
    },
    1000
  );
  
  
  var percent_number_step = $.animateNumber.numberStepFactories.append(" m");
  $("#flat").animateNumber(
    {
      number: up[2],
      easing: "easeInQuad",

      numberStep: percent_number_step
    },
    1000
  );
  
  $("#flat").css('font-weight','normal');
  $("#uphill").css('font-weight','normal');
  $("#downhill").css('font-weight','normal');
  $("#time_spent").css('font-weight','normal');
}
