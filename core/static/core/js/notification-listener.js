'use strict';

var $ = require('jquery'),
    Firebase = require('firebase');

$(function () {

    var displayNotification = false;

    function clickNotification(n){
        if(n.tag !== CHAT_ID){
            n.onclick = function () {
                location.href = "/chats/" + n.tag;
            }
        }
    }

    function closeNotification(n){
        n.onshow = function () {
            setTimeout(n.close.bind(n), 10000);
        }
    }

    function allowNotifications(){
        if ("Notification" in window) {
            if(Notification.permission !== "denied" && Notification.permission !== "granted") {
                Notification.requestPermission(function (status) {
                    // This allows to use Notification.permission with Chrome/Safari
                    if (Notification.permission !== status) {
                        Notification.permission = status;
                    }
                });
            }
            return Notification.permission === "granted";
        }
        return false;
    }

    function notify(title, body, id){
        var notification = new Notification(title, {body: body, tag: id});
        clickNotification(notification);
        closeNotification(notification);
    }

    $(window).on('load', function () {
        allowNotifications();
    });

    if(typeof PROJECT_ID !== "undefined"){
        var i = 0;
        var ref = new Firebase("https://teamproject3.firebaseio.com/");
        // Creating a chat object
        var projectObj = ref.child("project/" + PROJECT_ID);
        var chatRoot = projectObj.child("chats");

        chatRoot.on("child_added", function(chats){
            var chatID = chats.key();
            chatRoot
                .child(chatID)
                .child("messages")
                .limitToLast(1)
                .on("child_added",
                function (object) {
                    var message = object.val();
                    if(displayNotification && message.user_id !== CURRENT_USER_ID){
                        notify("Chat #"+chatID, message.desc, chatID);
                    }
                });

        });

    }

    setTimeout(function(){
        displayNotification = true;
    }, 3000);

});