$(function() {

    // Initialise the Firebase
    var ref = new Firebase("https://torid-fire-4899.firebaseio.com/");

    // Get the messages reference for this chat
    var messagesRef = ref.child('chats');

    // Select the input box and the latest messages list
    var messages = $(".latest-messages");
    var messageInput = $("#input-message");

    messageInput.keypress(function(e) {
        if (e.keyCode == 13) {
            messagesRef.push({
                desc: messageInput.val(),
                user: CURRENT_USER,
                dt: Date.now()
            });
            messageInput.val("");
        }
    });

    messagesRef.on("child_added", function(object) {

        var child = object.val();

        //Create a new date field to use in Mustache
        child.formattedDate = getFormattedDate(child.dt);

        var messagesTemplate =
            '<li class="list-group-item">' +
            '<strong>{{ user }}:</strong> {{ desc }} {{ formattedDate }}' +
            '</li>'

        var renderedTemplate = Mustache.to_html(messagesTemplate, child);
        messages.append(renderedTemplate);


        // On new message load, scroll to the top.
        messages[0].scrollTop = messages[0].scrollHeight;
    });

    //Format the date into day/month/year format
    function getFormattedDate (dt){
        var date = new Date(dt);
        return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
    }

});