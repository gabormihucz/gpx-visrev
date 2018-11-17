$(document).ready(function(){
        $('#toggle').click(function(){
            $(this).text($(this).text() == 'Elevation' ? 'Speed' : 'Elevation');
        })
    });