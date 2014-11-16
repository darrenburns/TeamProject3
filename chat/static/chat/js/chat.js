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
        var user = child.user;
        var msg = child.desc;
        var date = new Date(child.dt);

        // Todo: move this abomination to Mustache.js
        messages.append('<li class="list-group-item">' +
                            '<strong>' + child.user + ':</strong> '+ child.desc + "" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() +
                        '</li>'
        );


        // On new message load, scroll to the top.
        messages[0].scrollTop = messages[0].scrollHeight;
    });
});