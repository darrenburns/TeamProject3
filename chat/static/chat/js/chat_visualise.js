$(function() {

    if (typeof CHAT_ID != 'undefined' && typeof PROJECT_ID != 'undefined') {

        // Initialise the Firebase
        var ref = new Firebase("https://torid-fire-4899.firebaseio.com/");

        // Creating a chat object
        var projectObj = ref.child('project/' + PROJECT_ID);
        var chatObj = projectObj.child('chats/' + CHAT_ID);

        var messagesRef = chatObj.child("messages");

        // One day, this will be made to work! Maybe today?
        /*messagesRef.once('value', function(snap) {

            for (var message in snap) {
                console.log(snap);
            }

        })*/

    }
})