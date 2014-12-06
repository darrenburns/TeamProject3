$(function () {
    if (typeof CHAT_ID != 'undefined') {
        // Initialise the Firebase
        var ref = new Firebase("https://torid-fire-4899.firebaseio.com/");

        // Creating a chat object
        var chatObj = ref.child('chats/' + CHAT_ID);

        //creating the child note participants to the chat
        var chatParticipants = chatObj.child("participants");

        var messagesRef = chatObj.child("messages");


        // Select the input box and the latest messages list
        var messages = $(".latest-messages");
        var messageInput = $("#input-message");

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
                    '<div class="col-md-2 message-user">' +
                        '<h5 class="list-group-item-heading"><strong>{{ user }} <br> {{ formattedDate }}</h5>'+
                    '</div>' +
                        '<div class="col-md-10">' +
                '<p class="list-group-item-text">'+
                    '</strong> {{ desc }} '+
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