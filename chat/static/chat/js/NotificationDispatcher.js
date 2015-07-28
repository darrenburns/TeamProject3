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

    notifyUserMentioned: function(userMentioned, messageObj, chatId){

        var title = "You were mentioned in chat #" + chatId,
            message = messageObj.desc,
            date = messageObj.dt,
            author = messageObj.user;

        this.postNotification(userMentioned, title, message, date, author, chatId);
    }
};
module.exports=NotificationDispatcher;