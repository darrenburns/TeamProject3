$(function() {

    var ticketsList = $('#tickets-list');
    ticketsList.css('display', 'none');

    $( '.dropdown-menu li a').bind( 'click', function() {
        var selText = $(this).text();
        $(this).parents('.dropdown').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
        $('#dashboard-title').html(selText);
        ticketsList.css('display', 'block');
    });

    $.getJSON( "/api/v1/project/", function(data) {
        var htmlElements = "";
        $.each(data.objects, function(object){
            htmlElements += '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" >'+this.desc+'</a></li>';
        })
        $('#sidebar-dropdown-list').html(htmlElements);
    });

});
