var GLOBALS = require('../../../../core/static/core/js/globals'),
    Firebase = require('firebase');

var NotificationDispatcher = {

    notificationsRef: new Firebase(`${GLOBALS.FIREBASE_BASE_URL}notifications`),

    postNotification: function(user, title, message, date, author, chatId){

        var pushJSON = {
            "title": title,
            "message": message,
            "date": date,
            "author": author,
            "chatId": chatId,
            "read": false
        };

        this.notificationsRef.child(user).push(pushJSON);
    },

    postNotifications: function(users, title, chatId, author, newCost){
        var myFunction = this.notificationsRef;
        var date = Date.now();
        var message = "The new cost of chat #" + chatId + " is: " + newCost;
        users.forEach(function(user){
            var username = user.username;
            if(username !== 'undefined'){
                var pushJSON = {
                    "title": title,
                    "message": message,
                    "date": date,
                    "author": author,
                    "chatId": chatId,
                    "read": false
                };
                myFunction.child(username).push(pushJSON);
            }

        });
    },

    notifyUserMentioned: function(userMentioned, messageObj, chatId){

        var title = "You were mentioned in chat #" + chatId,
            message = messageObj.desc,
            date = messageObj.dt,
            author = messageObj.user;

        this.postNotification(userMentioned, title, message, date, author, chatId);
    },

    notifyAllUsers: function(users, newCost, chatId, author){
        var title = "Cost has changed";
        this.postNotifications(users, title, chatId, author, newCost);
    }
};
module.exports=NotificationDispatcher;