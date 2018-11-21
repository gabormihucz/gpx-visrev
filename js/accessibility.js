$('#default-font-style').click(function() {
    $("*").not(".fa-upload").css("font-family", '"Helvetica Neue", Helvetica, Arial, sans-serif');
})

$('#comic-font-style').click(function() {
    $("*").not(".fa-upload").css("font-family", '"Comic Sans MS", cursive, sans-serif');
})

$('#monospace-font-style').click(function() {
    $("*").not(".fa-upload").css("font-family", '"Lucida Console", Monaco, monospace');
})

$('#default-font-size').click(function() {
    $(".detailed").css("font-size", "1em");
    $(".navbar-brand").css("font-size", "2em");
    $(".btn").css("font-size", "20px");
    $(".fa-upload").css("font-size", "20px");
    $(".legend").css("font-size", "0.8em");
})

$('#large-font-size').click(function() {
    $(".detailed").css("font-size", "1.5em");
    $(".navbar-brand").css("font-size", "3em");
    $(".btn").css("font-size", "30px");
    $(".fa-upload").css("font-size", "30px");
    $(".legend").css("font-size", "1.2em");
})

$('#huge-font-size').click(function() {
    $(".detailed").css("font-size", "2em");
    $(".navbar-brand").css("font-size", "4em");
    $(".btn").css("font-size", "40px");
    $(".fa-upload").css("font-size", "40px");
    $(".legend").css("font-size", "1.6em");
})

$('#bold-font-weight').click(function() {
    if ($(".dropdown-toggle").css("font-weight") == 400) {
        $(".dropdown-toggle").css("font-weight", "bold");
        $(".fly").css("font-weight", "bold");
        $(".legend").css("font-weight", "bold");
    }
    else {
        $(".dropdown-toggle").css("font-weight", "normal");
        $(".fly").css("font-weight", "normal");
        $(".legend").css("font-weight", "normal");
    }
})