$(function () {

    //This function render the template using Mustache and substitute the element content
    function renderTemplate(element, template, object){
        var renderedTemplate = Mustache.to_html(template, object);
        element.html(renderedTemplate);
    }

    /*
    This function will update the max-height of the list to adapt to different screens
    It is done by calculating the difference between the height of the window and the HTML elements
    outerHeight is the height of element with its margins
     */
    function setListHeight() {
        var windowHeight = $( window ).outerHeight();
        var navbarHeight = $(".navbar-inverse").outerHeight();
        var dropdownHeight = $("#dropdown-row").outerHeight();

        var maxHeight = windowHeight - (navbarHeight + dropdownHeight + 50);
        ticketsPanel.css("max-height", maxHeight+"px");
    }

    var ticketsPanel = $('#tickets-panel');
    var openTicketsList = ticketsPanel.find('#open-tickets-list');
    var closedTicketsList = ticketsPanel.find('#closed-tickets-list');

    //Call the function once
    setListHeight();

    //If the user resizes the screen the height is updated
    $(window).on('resize', function() { setListHeight(); });

    var selected_project = null;  // Global variable so that we can access it for FireBase purposes later

    //Disable the list button and the new chat button to avoid errors when there are no projects created
    var sidebarDropdownButton = $('#sidebar-dropdown-button');
    sidebarDropdownButton.prop('disabled', true);

    var newChatButton = $('#new-project-button');
    newChatButton.prop('disabled', true);


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
                var projectsListTemplate = '{{#projects}}<li role="presentation"><a role="menuitem" tabindex="-1" href="#" id="{{id}}">{{name}}</a></li>{{/projects}}';
                renderTemplate($('#sidebar-dropdown-list'), projectsListTemplate, {'projects': projectObjects})

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

                //Update the reference to the correct project id when creating a new chat and enable the button again
                newChatButton.parent().attr('href', '/projects/' + id + '/newchat/');
                newChatButton.prop('disabled', false);

                //Separate open tickets from closed tickets and add them to the correct array
                var chatObjects = chats.objects;
                var openChatsObject = [];
                var closedChatsObject = [];
                for(var i in chatObjects){
                    var project = chatObjects[i];
                    if(project.closed == null){
                        openChatsObject.push(project);
                    } else {
                        closedChatsObject.push(project);
                    }
                }

                // Create mustache template for rendering tickets list
                var openChatsListTemplate = '{{#chats}}<a class="list-group-item" id="chat-{{ id }}" href="/chats/{{ id }}">{{ title }}</a>{{/chats}}';
                renderTemplate(openTicketsList, openChatsListTemplate, {'chats': openChatsObject});
                var closedChatsListTemplate = '{{#chats}}<a class="list-group-item" id="chat-{{ id }}" href="/chats/{{ id }}">{{#closed}}<span class="label label-danger">C</span>{{/closed}} {{ title }}</a>{{/chats}}';
                renderTemplate(closedTicketsList, closedChatsListTemplate, {'chats': closedChatsObject});

                // Update the project name in the button
                var project = $('#' + id);
                var projectTitle = project.text();
                project.parents('#project-list')
                    .find('#project-button')
                    .html(projectTitle)
                    .on("click", function(){
                        var url = "/projects/"+id+"/info/";
                        if(typeof CHAT_ID != 'undefined'){
                            url = url + "?next="+CHAT_ID;
                        }
                        location.href=url;
                    })
                    ;

                // Update the dashboard title to the project desc
                $('#dashboard-title').text(projectTitle);

                //Add a class active and make the accordion open
                if (typeof CHAT_ID != 'undefined') {
                    $("#chat-" + CHAT_ID).addClass('active').parent().parent().collapse('show');
                }
            });
    }


});
