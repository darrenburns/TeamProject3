$(function () {

    var currentProjectId;  // The ID of the project currently selected.
    var isAscending;  // Whether the sorting field is applied in ascending order or not
    var orderByField;  // The field we are currently sorting on
    var orderByString;
    var searchTerm = '';  // The current value inside the search box

    //This function renders the template using Mustache and substitute the element content
    function renderTemplate(element, template, object) {
        var renderedTemplate = Mustache.to_html(template, object);
        element.html(renderedTemplate);
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }

    /*
     This function will update the max-height of the list to adapt to different screens
     It is done by calculating the difference between the height of the window and the HTML elements
     outerHeight is the height of element with its margins
     */
    function setListHeight() {
        var windowHeight = $(window).outerHeight();
        var navbarHeight = $(".navbar-inverse").outerHeight();
        var dropdownHeight = $("#dropdown-row").outerHeight();

        var maxHeight = windowHeight - (navbarHeight + dropdownHeight + 50);
        ticketsPanel.css("max-height", maxHeight + "px");
    }

    var ticketsPanel = $('#tickets-panel');
    var openTicketsList = ticketsPanel.find('#open-tickets-list');
    var closedTicketsList = ticketsPanel.find('#closed-tickets-list');
    var navbarDropdownProjectList = $('#navbar-dropdown-list');
    var sortingOptionList = $("#dropdown-sorting-options").find("li");
    //Call the function once
    setListHeight();

    //If the user resizes the screen the height is updated
    $(window).on('resize', function () {
        setListHeight();
    });

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

                if (typeof PROJECT_ID != 'undefined') {
                    selectProject(PROJECT_ID, null, true);
                } else {
                    selected_project = projectObjects[0].id;
                    selectProject(selected_project, null, true);
                }

                //Render template. Update display
                var projectsListTemplate = '{{#projects}}<li role="presentation"><a role="menuitem" tabindex="-1" href="#" id="{{id}}">{{name}}</a></li>{{/projects}}';
                renderTemplate(navbarDropdownProjectList, projectsListTemplate, {'projects': projectObjects});

                var newProjectLink = $("<li class='divider'></li><li><a href='/newproject'><span class='glyphicon glyphicon-plus'></span> New Project </a></li>");
                navbarDropdownProjectList.append(newProjectLink);
                //Bind the click event into projects items
                navbarDropdownProjectList.find('li a').bind('click', function () {
                    selected_project = this.getAttribute('id');
                    selectProject(selected_project, null, true);
                });
            } else {
                $("#project-title").html("No projects");
                var noProjectsMessage = ' <div class="text-center" id="no-project-div">\
            <i class="fa fa-frown-o fa-fw" style="font-size: 300px; color: #f0f0f0;"></i>\
            <h1><small>You don\'t have any projects</small></h1>\
            <br>\
            <a href="/newproject/">\
            <button type="button" class="btn btn-default" id="new-project-dashboard">\
                <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> New project\
            </button>\
            </a>\
        </div>';
                $("#no-project-message").html(noProjectsMessage);
            }


        });

    // Load chats for this project
    function loadChats(id) {

        $.getJSON("/api/v1/chat/",
            {
                'project__id': id,
                'order_by': orderByString,
                'title__contains': searchTerm
            })
            .success(function (chats) {

                //Update the reference to the correct project id when creating a new chat and enable the button again
                newChatButton.parent().attr('href', '/projects/' + id + '/newchat/');
                newChatButton.prop('disabled', false);

                //Separate open tickets from closed tickets and add them to the correct array
                var chatObjects = chats.objects;
                var openChatsObject = [];
                var closedChatsObject = [];
                var nullDueDateChatObjects = [];

                for (var i in chatObjects) {
                    var project1 = chatObjects[i];
                    if (project1.closed == null) {

                        if (orderByField == "due_date" && project1.ticket.due_date == null) {
                            nullDueDateChatObjects.push(project1);
                        } else {
                            openChatsObject.push(project1);
                        }

                    } else {
                        closedChatsObject.push(project1);
                    }
                }

                if (nullDueDateChatObjects.length > 0) {
                    for (var j in nullDueDateChatObjects) {
                        var project2 = nullDueDateChatObjects[j];
                        openChatsObject.push(project2);
                    }
                }

                $('#number-of-conversations').html(openChatsObject.length);
                $('#number-of-closed-conversations').html(closedChatsObject.length);

                for (var i in chatObjects) {
                    if (chatObjects[i].ticket.priority != null) {
                        if (chatObjects[i].ticket.priority.name == "High") {
                            chatObjects[i].isHighPriority = true;
                        }
                    }
                }

                // Create mustache template for rendering tickets list
                var chatListTemplate = '{{#chats}}<a class="list-group-item {{#isHighPriority}}list-group-item-danger{{/isHighPriority}}" id="chat-{{ id }}" href="/chats/{{ id }}">' +
                    '{{#isHighPriority}} <i class="fa fa-exclamation" style="color:#D10F0F"></i>{{/isHighPriority}}    {{ title }} ' +
                    '{{#ticket}}{{#tag}}<span class="label label-default" style="background-color:{{colour}}">{{title}}</span> {{/tag}}{{/ticket}}</a>{{/chats}}';
                renderTemplate(openTicketsList, chatListTemplate, {'chats': openChatsObject});
                renderTemplate(closedTicketsList, chatListTemplate, {'chats': closedChatsObject});


                // Update the project name in the button
                var project = $('#' + id);
                var projectTitle = project.text();
                var url = "/projects/" + id + "/info/";

                project.parents("#dropdown-row").find("#sidebar-dropdown-button").html(projectTitle + ' <span class="caret"></span>');

                if (typeof CHAT_ID != 'undefined') {
                    url = url + "?next=" + CHAT_ID;
                }

                //Adding the project title to the H1 heading on sidebar_base and changing the url
                $("#project-title").find("a").html(projectTitle).attr("href", url);

                //Add a class active and make the accordion open
                if (typeof CHAT_ID != 'undefined') {
                    $("#chat-" + CHAT_ID).addClass('active').parent().parent().collapse('show');
                }
            });
    }

    function selectProject(projectId) {
        orderByString = isAscending ? 'ticket' : '-ticket';

        if (orderByField && orderByField != "open_date") {
            orderByString += "__" + orderByField; //ticket__<name_of_the_field>
        }

        //Removing the div with the no project text
        $("#no-project-div").remove();
        currentProjectId = projectId;
        loadChats(projectId);
    }

    sortingOptionList
        .on("click", function () {
            var sortingID = this.id;
            var options = sortingID.split("-");

            orderByField = options[0];
            isAscending = options[1] == "asc";

            selectProject(PROJECT_ID);
            sortingOptionList.removeClass("active");
            $(this).addClass("active");

        });

    $('#search-box').on('keyup', function (event) {
        searchTerm = $(this).val();
        loadChats(currentProjectId);
    });


});
