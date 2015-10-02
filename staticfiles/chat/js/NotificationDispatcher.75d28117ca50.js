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

    postNotifications: function(users, title, chatId, author, newCost, newPriority){
        var myFunction = this.notificationsRef;
        var date = Date.now();
        if(newCost !== null){
            var messageCost = "The new cost of chat #" + chatId + " is: " + newCost;
        }
        if(newPriority !== null){
            var messagePriority = "The new priority of chat #" + chatId + " is: " + newPriority;
        }
        users.forEach(function(user){
            var username = user.username;
            if(username !== 'undefined'){
                if(newPriority !== null){
                    var pushJSON = {
                    "title": title,
                    "message": messagePriority,
                    "date": date,
                    "author": author,
                    "chatId": chatId,
                    "read": false
                };
                }
                if(newCost !== null){
                    var pushJSON = {
                    "title": title,
                    "message": messageCost,
                    "date": date,
                    "author": author,
                    "chatId": chatId,
                    "read": false
                };
                }

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

    notifyAllUsers: function(users, newCost, chatId, author, newPriority){
        var titleCost = "Cost has changed";
        var titlePriority = "Priority has changed";
        if(newCost !== null){
            this.postNotifications(users, titleCost, chatId, author, newCost, null);
        }
        if(newPriority !== null){
            this.postNotifications(users, titlePriority, chatId, author, null, newPriority);
        }
    }
};
module.exports=NotificationDispatcher;