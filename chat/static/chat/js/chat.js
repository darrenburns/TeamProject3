$(function () {

    //Cache the container and the input for later use
    var messages = $(".latest-messages");
    var messageInput = $("#input-message");
    var tabInformation = $("#tab-information");
    var metadataColumn = $("#metadata-column");
    var selectMetadataName;
    var apiCall = "/api/v1/";
    var initialNoteValue;
    var initialTags = [];
    var noteTextArea = $("#note-value");
    var converter = new Showdown.converter();

    function attachMessageToNotes(message, user_id, date){
        var d = new Date(date);
        var passData = {
            "chat": apiCall + "chat/" + CHAT_ID + "/",
            "sent" : d.toISOString(),
            "user" : apiCall+ "user/" + user_id + "/",
            "text": message
        };
        console.log(passData);
        $.ajax({
            url: apiCall + "message/",
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(passData),
            complete: function (data) {
                getMetadataInformation(CHAT_ID);
                getSavedMessages();
                $("#open-tab-information").tab("show");
            }
        });
    }
    // Function to go through the list of tags and adding the tag.title and tag.colour to a coloured box
    function listToHtml(arrayTag){
        if(arrayTag.length > 0){
            initialTags = [];
            var htmlOutput = "";
            for (var i in arrayTag){
                initialTags.push(apiCall + "tag/" + arrayTag[i].id + "/");
                htmlOutput += "<span class='label label-default test' style='background-color:"+ arrayTag[i].colour +"'>" + arrayTag[i].title + "</span>    ";
            }
            return htmlOutput;
        }else{
            return "";
        }
    }

    //function to add a box with the priority colour
    function priorityBox(priority){
        var htmlOutput = "<span class='label label-default' style='background-color: " + priority.colour + "'>"+ priority.name + "</span>";
        return htmlOutput;
    }

    //This function will update the max-height of the container to adapt to different screens
    //It is done by calculating the difference between the height of the window and the HTML elements
    //outerHeight is the height of element with its margins
    function setContainerHeight() {
        var windowHeight = $(window).outerHeight();
        var navbarHeight = $(".navbar-inverse").outerHeight();
        var chatTitleHeight = $("#chat-title").outerHeight();
        var navTabsHeight = $(".nav-tabs").outerHeight();
        var messageInputHeight = messageInput.outerHeight();

        var maxHeight = windowHeight - (navbarHeight + chatTitleHeight + navTabsHeight + messageInputHeight + 50);
        messages.css("max-height", maxHeight + "px");
    }

    //If the user resizes the screen the height is updated
    $(window).on('resize', function () {
        setContainerHeight();
    });

    //Call the function once
    setContainerHeight();

    // Returns a readable string representing a Date object (includes time of day).
    function getFormattedDate(dt) {
        var d = new Date(dt);
        return d.toLocaleTimeString() + " on " + d.toLocaleDateString();

    }

    //This function receives the title and value of a metadata,
    //creates a new panel and attaches it to the information tab
    function displayMetadataInformation(title, value) {

        var divRow;
        var lastRow = metadataColumn.children(".row").last(); //Get the last row of information tab
        var childrenNumber = lastRow.children().length; //Get the number of columns of that row

        if (childrenNumber === 0 || childrenNumber === 2) { //If the row does not exist or it has 2 children
            divRow = $("<div>", {class: "row"}); //Create a new row
        } else {
            divRow = lastRow; //or use the last row
        }

        //Elements to append the metadata information
        var panelInformation = $("<div>", {class: "panel panel-default panel-information"});
        var panelHeading = $("<div>", {class: "panel-heading"});
        var panelBody = $("<div>", {class: "panel-body"});
        var divColumn = $("<div>", {class: "col-sm-6"});

        //Fill the content into the panel and add it to the row
        panelHeading.html("<strong>" + title + "</strong>");
        panelBody.html(value);
        panelInformation.append(panelHeading);
        panelInformation.append(panelBody);
        divColumn.append(panelInformation);
        divRow.append(divColumn);
        metadataColumn.append(divRow);

    }

    function getMetadataInformation(chatId) {
        $.getJSON("/api/v1/ticket/" + CHAT_ID + "/")
            .success(function (data) {
                var description = "";
                $.getJSON("/api/v1/chat/" + CHAT_ID + "/")
                    .success(function (chatData){
                        description = chatData.description;
                        metadataColumn.html("");

                        var metadataObject = data;
                        var dateCreated = metadataObject.created;
                        var dateClosed = metadataObject.closed;
                        var cost = metadataObject.cost;
                        var dueDate = metadataObject.due_date;
                        var notes = metadataObject.notes;
                        var tags = metadataObject.tag;
                        var priority = metadataObject.priority;
                        var user = null;

                        if (metadataObject.user != null) {
                            user = metadataObject.user.username;
                        }

                        if (user != null) {
                            displayMetadataInformation("Assignee", user);
                        }

                        displayMetadataInformation("Date created", getFormattedDate(dateCreated));

                        if (dateClosed !== null) {
                            displayMetadataInformation("Date closed", getFormattedDate(dateClosed));
                        }

                        if (cost != null) {
                            displayMetadataInformation("Cost", cost);
                        }

                        if (dueDate != null) {
                            displayMetadataInformation("Due Date", getFormattedDate(dueDate));
                        }

                        if (priority != null){
                            displayMetadataInformation("Priority", priorityBox(priority));
                        }

                        if(description != ""){
                            displayMetadataInformation("Description", description);
                        }

                        if(tags.length > 0){
                            displayMetadataInformation("Tags", listToHtml(tags));
                        }

                        if (notes != null) {
                            var formattedNote = converter.makeHtml(notes);
                            displayMetadataInformation("Notes", formattedNote);
                            noteTextArea.val(notes);
                            initialNoteValue = notes;
                        }



                    });

            });
    }

    function addMessage(object) {

        var child = object.val();
        var unformattedMessage = [];
        unformattedMessage.push(child.desc);
        //Create a new date field to use in Mustache
        child.formattedDate = getFormattedDate(child.dt);
        var formattedMessage = converter.makeHtml(child.desc);
        child.messageId = unformattedMessage.length - 1;
        var messagesTemplate =
            '<div class="row">' +
            '<div class="col-xs-1">' +
            '<div class="user-box pull-right">' +
            '<span class="text-muted">' +
            '<em>' +
            '{{ user }}' +
            '</em>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-11">';

        if (CURRENT_USER == child.user) {
            messagesTemplate += '<div class="message-container triangle-right right">';
        } else {
            messagesTemplate += '<div class="message-container triangle-right left">';
        }
        messagesTemplate +=
            '--message--' +
            '<p class="message-date">{{ formattedDate }}' +
            '<i class="fa fa-plus-square fa-lg pull-right message-to-note" id="message-{{ messageId }}">' +
            ' <small>Save</small></i>' +
            '</p>' +
            '</div>' +
            '</div>' +
            '</div>';

        var regularExpression = new RegExp("<p>", 'g');
        var renderedTemplate = Mustache.to_html(messagesTemplate, child);
        renderedTemplate = renderedTemplate.replace("--message--", formattedMessage);
        renderedTemplate = renderedTemplate.replace(regularExpression, "<p class='lead message-text'>");
        messages.append(renderedTemplate);
        $(".message-container").find(".message-to-note").last().on("click", function(){
            var message = unformattedMessage[this.id.split("-")[1]];
            attachMessageToNotes(message, child.user_id, child.dt);
        });
        // On new message load, scroll to the top.
        messages[0].scrollTop = messages[0].scrollHeight;
    }

    if (typeof CHAT_ID != 'undefined' && typeof PROJECT_ID != 'undefined' &&
        typeof CURRENT_USER_ID != 'undefined') {
        // Initialise the Firebase
        var ref = new Firebase("https://teamproject3.firebaseio.com/");

        // Creating a chat object
        var projectObj = ref.child('project/' + PROJECT_ID);
        var chatObj = projectObj.child('chats/' + CHAT_ID);

        var chatParticipants = chatObj.child("participants");

        var selectUserProfile;

        chatParticipants.startAt().endAt().on("value", function (snapshot) {
            var participants = snapshot.val();
            var found = false;
            for (var key in participants) {
                if (participants.hasOwnProperty(key)) {
                    var user = participants[key];
                    if (CURRENT_USER == user) {
                        found = true;
                        break;
                    }
                }
            }

            if (!found) {
                chatParticipants.push(CURRENT_USER);
            }

        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

        var messagesRef = chatObj.child("messages");

        messagesRef.once('value', function(snap){
            var messages = snap.val();
            if(messages == null){
                $("#spin").hide();
                $("#chat-empty").removeClass("invisible");
            }
        });

        //Listen for ENTER press and update Firebase
        messageInput.keypress(function (e) {
            if (e.keyCode == 13 && !e.shiftKey) {
                e.preventDefault();
                messagesRef.push({
                    desc: messageInput.val(),
                    user: CURRENT_USER,
                    user_id: CURRENT_USER_ID,
                    dt: Date.now()
                });
                messageInput.val("");
            }
        });

        messagesRef.on("child_added", function (object) {
            $("#spin").hide();
            $("#chat-empty").addClass("invisible");
            addMessage(object);
        });

        getMetadataInformation(CHAT_ID);

    }

    $.getJSON("/api/v1/metadata_name/")
        .success(function (metadataName) {
            var metadataObjects = metadataName.objects;
            var metadataNameListTemplate = "{{#metadataName}}<li><a id='metadata-name-{{ id }}'>{{ name }}</a></li>{{/metadataName}}";
            var renderedTemplate = Mustache.to_html(metadataNameListTemplate, {'metadataName': metadataObjects});
            $("#list-metadata-name")
                .html(renderedTemplate)
                .find("a")
                .on("click", function () {
                    $("#dropdown-metadata-name").html(this.text + ' <span class="caret"></span>');
                    selectMetadataName = this.id.split("-")[2]; //Get the id of the selected metadata name
                });
        });

    $.getJSON("/api/v1/user_profile/")
        .success(function (userProfile) {
            var userProfileObjects = userProfile.objects;
            var userProfileListTemplate = "{{#userProfile}}<li><a id='user-profile-{{ id }}'>{{ user.username }}</a></li>{{/userProfile}}";
            var renderedTemplate = Mustache.to_html(userProfileListTemplate, {'userProfile': userProfileObjects});
            $("#list-user")
                .html(renderedTemplate)
                .find("a")
                .on("click", function () {
                    $("#user-dropdown-button").html(this.text + ' <span class="caret"></span>');
                    selectUserProfile = this.id.split("-")[2]; //Get the id of the selected user profile
                });
        });

    $.getJSON("/api/v1/tag/")
        .success(function (tagObjects) {
            var tagObjects = tagObjects.objects;
            var tagsListTemplate = "{{#tags}}<li><a id='{{ id }}'>{{ title }}</a></li>{{/tags}}";
            var renderedTemplate = Mustache.to_html(tagsListTemplate, {'tags': tagObjects});
            $("#list-tags")
                .html(renderedTemplate)
                .find("a")
                .on("click", function () {
                    $("#tags-dropdown-button").html(this.text + ' <span class="caret"></span>');
                    selectTag = this.id; //Get the id of the selected tag
                });
        });

    $.getJSON("/api/v1/priority/")
        .success(function (priorityObjects) {
            var priorityObjects = priorityObjects.objects;
            var priorityListTemplate = "{{#priority}}<li><a id='{{ id }}'>{{ name }}</a></li>{{/priority}}";
            var renderedTemplate = Mustache.to_html(priorityListTemplate, {'priority': priorityObjects});
            $("#list-priority")
                .html(renderedTemplate)
                .find("a")
                .on("click", function () {
                    $("#priority-dropdown-button").html(this.text + ' <span class="caret"></span>');
                    selectPriority = this.id; //Get the id of the selected tag
                });
        });

    $("#confirm-add-note").on("click", function () {

        var passData = {
            "notes" : noteTextArea.val()
        };

        $.ajax({
            url: apiCall + "ticket/" + CHAT_ID + "/",
            type: "PATCH",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(passData),
            complete: function () {
                getMetadataInformation(CHAT_ID);
                $("#open-tab-information").tab("show");
            }
        });

    });

    $("#confirm-add-due-date").on("click", function () {

        var passData = {
            "due_date": $("#due-date-value").val()
        };

        $.ajax({
            url: apiCall + "ticket/" + CHAT_ID + "/",
            type: "PATCH",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(passData),
            complete: function () {
                getMetadataInformation(CHAT_ID);
                $("#open-tab-information").tab("show");
            }
        });

    });

    $("#confirm-add-cost").on("click", function () {

        var passData = {
            "cost": parseInt($("#cost-value").val())
        };

        $.ajax({
            url: apiCall + "ticket/" + CHAT_ID + "/",
            type: "PATCH",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(passData),
            complete: function () {
                getMetadataInformation(CHAT_ID);
                $("#open-tab-information").tab("show");
            }
        });

    });

    $("#confirm-add-assignee").on("click", function () {

        var passData = {
            "user": apiCall + "user/" + selectUserProfile + "/"
        };

        $.ajax({
            url: apiCall + "ticket/" + CHAT_ID + "/",
            type: "PATCH",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(passData),
            complete: function (data) {
                getMetadataInformation(CHAT_ID);
                $("#open-tab-information").tab("show");
            }
        });

    });

    $("a[href='#modal-add-note']").on("click", function(){
        if(initialNoteValue != null){
            noteTextArea.val(initialNoteValue);
        }
    });

    $("#confirm-add-tags").on("click", function () {
            initialTags.push(apiCall + "tag/" + selectTag + "/");
            //console.log(initialTags);
            var passData = {
                "tag": initialTags
            };
            $.ajax({
            url: apiCall + "ticket/" + CHAT_ID + "/",
            type: "PATCH",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(passData),
            complete: function (data) {
                //console.log(data);
                getMetadataInformation(CHAT_ID);
                $("#open-tab-information").tab("show");
            }
        });

            });

    $("#confirm-add-priority").on("click", function () {

        var passData = {
            "priority": apiCall + "priority/" + selectPriority + "/"
        };
            $.ajax({
            url: apiCall + "ticket/" + CHAT_ID + "/",
            type: "PATCH",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(passData),
            complete: function (data) {
                getMetadataInformation(CHAT_ID);
                $("#open-tab-information").tab("show");
            }
        });

    });

    var savedMessages = $("#saved-messages");

    function getSavedMessages(){

        if (typeof CHAT_ID != 'undefined') {
            $.getJSON("/api/v1/message/", {
                chat__id: CHAT_ID
            }).success(function(response) {
                savedMessages.text("");
                var messages = response.objects;
                if (messages.length == 0) {
                    savedMessages.html('<li class="list-group-item">You have no saved messages</li>');
                } else {
                    messages.forEach(function (message) {
                        var d = new Date(message.sent);
                        savedMessages.append(
                            '<li class="list-group-item" id="saved-message-item">' + converter.makeHtml(message.text) +
                            '<p class="message-date-2">' + message.user.username + " - " + d.toLocaleDateString() + '</p></li>'
                        );
                    });
                }
            });
        }
    }

    getSavedMessages();

});
