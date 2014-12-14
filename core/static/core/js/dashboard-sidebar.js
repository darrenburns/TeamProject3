$(function () {

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

        $.getJSON("/api/v1/chat", {'project__id': id})
            .success(function (chats) {

                //Add new chat button to the tickets list
                var newChatButton =
                    '<li role="presentation"><a href="/projects/'+id+'/newchat/">'+
                        '<button type="button" class="btn btn-default">' +
                            '<span class="glyphicon glyphicon-plus"></span> New chat' +
                        '</button></a></li>';

                // Create mustache template for rendering tickets list
                var chatObjects = chats.objects;
                var chatsListTemplate = '{{#chats}}<li role="presentation"><a href="/chats/{{ id }}">{{ title }}</a></li>{{/chats}}';
                var renderedTemplate = Mustache.to_html(chatsListTemplate, {'chats': chatObjects});

                // Update ticket list
                $('#tickets-list').html(newChatButton + renderedTemplate);

                // Update the project name in the button
                var project = $('#' + id);
                var projectTitle = project.text();
                project.parents('.dropdown').find('.dropdown-toggle').html(projectTitle + ' <span class="caret"></span>');

                // Update the dashboard title to the project desc
                $('#dashboard-title').text(projectTitle);


            });
    }


});
