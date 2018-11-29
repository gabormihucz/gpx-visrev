function timeSpent(time) {


  total = Math.round(time/60);
  var percent_number_step = $.animateNumber.numberStepFactories.append(" min");
  $("#time_spent").animateNumber(
    {
      number: total,
      easing: "easeInQuad",

      numberStep: percent_number_step
    },
    1000
  );
  $(".grad")
    .css({ opacity: 0.0, visibility: "visible" })
    .animate({ opacity: 1.0 }, 1000);

}
