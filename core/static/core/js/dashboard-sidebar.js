$(function() {

    var ticketsList = $('#tickets-list');
    ticketsList.css('display', 'none');

    $( '.dropdown-menu li a').bind( 'click', function() {
        var selText = $(this).text();
        $(this).parents('.dropdown').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
        $('#dashboard-title').html(selText);
        ticketsList.css('display', 'block');
    });

});
