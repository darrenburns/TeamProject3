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

    postNotifications: function(users, title, chatId){
        console.log(users);
        var myFunction = this.notificationsRef;
        users.forEach(function(user){
            var username = user.username;
            if(username !== 'undefined'){
                var pushJSON = {
                    "title": title,
                    "message": "test",
                    "date": 1437933090906,
                    "author": "System",
                    "chatId": chatId,
                    "read": false
                };
                console.log(pushJSON);
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

    notifyAllUsers: function(users, newCost, chatId){
        var title = "The new cost of chat #" + chatId + " is: " + newCost;
        this.postNotifications(users, title, chatId);
    }
};
module.exports=NotificationDispatcher;