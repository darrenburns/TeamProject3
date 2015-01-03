$(function () {

    //Cache the container and the input for later use
    var messages = $(".latest-messages");
    var messageInput = $("#input-message");


    //This function will update the max-height of the container to adapt to different screens
    //It is done by calculating the difference between the height of the window and the HTML elements
    //outerHeight is the height of element with its margins
    function setContainerHeight() {
        var windowHeight = $( window ).outerHeight();
        var navbarHeight = $(".navbar-inverse").outerHeight();
        var chatTitleHeight = $("#chat-title").outerHeight();
        var navTabsHeight = $(".nav-tabs").outerHeight();
        var messageInputHeight = messageInput.outerHeight();

        var maxHeight = windowHeight - (navbarHeight + chatTitleHeight + navTabsHeight + messageInputHeight + 50);
        messages.css("max-height", maxHeight+"px");
    }


    //If the user resizes the screen the height is updated
    $(window).on('resize', function() { setContainerHeight(); });


    //Call the function once
    setContainerHeight();

    if (typeof CHAT_ID != 'undefined') {
        // Initialise the Firebase
        var ref = new Firebase("https://torid-fire-4899.firebaseio.com/");

        // Creating a chat object
        var chatObj = ref.child('chats/' + CHAT_ID);

        //creating the child note participants to the chat
        var chatParticipants = chatObj.child("participants");

        var messagesRef = chatObj.child("messages");

        //Listen for ENTER press and update Firebase
        messageInput.keypress(function (e) {
            if (e.keyCode == 13) {
                messagesRef.push({
                    desc: messageInput.val(),
                    user: CURRENT_USER,
                    dt: Date.now()
                });
                messageInput.val("");
            }
        });


        messagesRef.on("child_added", function (object) {
            addMessage(object)
        });

        function addMessage(object) {
            var child = object.val();
            chatParticipants.push(CURRENT_USER);
    
            //Create a new date field to use in Mustache
            child.formattedDate = getFormattedDate(child.dt);

            var messagesTemplate =
            '<div class="list-group-item message-container">'+
                '<div class="row">' +
                '<div class="col-md-1 message-user message-picture">'+
                    '<button type="button" class="btn btn-default btn-md ">'+
                        '<span class="glyphicon glyphicon-user" aria-hidden="true"></span>'+
                    '</button>'+
                '</div>' +
                    '<div class="col-md-1 message-user">' +
                        '<h5 class="list-group-item-heading"> <strong>{{ user }}</strong> <br> <i class="date">{{ formattedDate }}</i> </h5>'+
                    '</div>' +
                        '<div class="col-md-10">' +
                '<p class="list-group-item-text">'+
                     ' <h5>{{ desc }}</h5> '+
                '</p>'+
                        '</div>' +
                    '</div>' +

            '</div>';

            var renderedTemplate = Mustache.to_html(messagesTemplate, child);
            messages.append(renderedTemplate);


            // On new message load, scroll to the top.
            messages[0].scrollTop = messages[0].scrollHeight;
        }

        //Format the date into day/month/year format
        function getFormattedDate(dt) {
            var date = new Date(dt);
            return ("0" + date.getDate()).slice(-2) + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        }




    }


});
