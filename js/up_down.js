function upDown(up) {

  //console.log(Math.round(total));
  var percent_number_step = $.animateNumber.numberStepFactories.append(" km");
  $("#uphill").animateNumber(
    {
      number: up[0],
      easing: "easeInQuad",

      numberStep: percent_number_step
    },
    1000
  );
  
  
  var percent_number_step = $.animateNumber.numberStepFactories.append(" km");
  $("#downhill").animateNumber(
    {
      number: up[1],
      easing: "easeInQuad",

      numberStep: percent_number_step
    },
    1000
  );
  
  
  var percent_number_step = $.animateNumber.numberStepFactories.append(" km");
  $("#flat").animateNumber(
    {
      number: up[2],
      easing: "easeInQuad",

      numberStep: percent_number_step
    },
    1000
  );
}
