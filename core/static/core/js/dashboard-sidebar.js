$(function () {

    var ticketsList = $('#tickets-list');

    //This function will update the max-height of the list to adapt to different screens
    //It is done by calculating the difference between the height of the window and the HTML elements
    //outerHeight is the height of element with its margins
    function setListHeight() {
        var windowHeight = $( window ).outerHeight();
        var navbarHeight = $(".navbar-inverse").outerHeight();
        var DropdownHeight = $("#dropdown-row").outerHeight();

        var maxHeight = windowHeight - (navbarHeight + DropdownHeight + 50);
        ticketsList.css("max-height", maxHeight+"px");
    }

    //Call the function once
    setListHeight();

    //If the user resizes the screen the height is updated
    $(window).on('resize', function() { setListHeight(); });

    var selected_project = null;  // Global variable so that we can access it for FireBase purposes later

    var sidebarDropdownButton = $('#sidebar-dropdown-button');
    sidebarDropdownButton.prop('disabled', true);

    $.getJSON("/api/v1/project/")
        .success(function (projects) {

            //select first project
            var projectObjects = projects.objects;

            if (projectObjects.length > 0) {

                sidebarDropdownButton.prop('disabled', false);

                if(typeof PROJECT_ID != 'undefined'){
                    selectProject(PROJECT_ID);
                }else{
                    selected_project = projectObjects[0].id;
                    selectProject(selected_project);
                }


                //Render template. Update display
                projectsListTemplate = '{{#projects}}<li role="presentation"><a role="menuitem" tabindex="-1" href="#" id="{{id}}">{{name}}</a></li>{{/projects}}';

                var renderedTemplate = Mustache.to_html(projectsListTemplate, {'projects': projectObjects});
                $('#sidebar-dropdown-list').html(renderedTemplate);

                //Bind the click event into projects items
                $('.dropdown-menu li a').bind('click', function () {
                    selected_project = this.getAttribute('id');
                    selectProject(selected_project);
                });
            }


        });

    function selectProject(id) {
        // Make ajax request

        $.getJSON("/api/v1/chat/", {'project__id': id})
            .success(function (chats) {


                // Create mustache template for rendering tickets list
                var chatObjects = chats.objects;
                var chatsListTemplate = '{{#chats}}<li role="presentation"><a id="chat-{{ id }}" href="/chats/{{ id }}">{{#closed}}<span class="label label-danger">C</span>{{/closed}} {{ title }}</a></li>{{/chats}}';
                var renderedTemplate = Mustache.to_html(chatsListTemplate, {'chats': chatObjects});

                // Update ticket list
                ticketsList.html(renderedTemplate);

                // Update the project name in the button
                var project = $('#' + id);
                var projectTitle = project.text();
                project.parents('.dropdown').find('.dropdown-toggle').html(projectTitle + ' <span class="caret"></span>');

                // Update the dashboard title to the project desc
                $('#dashboard-title').text(projectTitle);

                //Add li class active
                if (typeof CHAT_ID != 'undefined') {
                    $("#chat-" + CHAT_ID).parent().addClass("active");
                }

            });
    }


});
