var NotificationDispatcher = require('./NotificationDispatcher');

var CustomMarkupParser = {

    parse: function(messageObj, chatId){
        var description = messageObj.desc;
        var arrayMentioned = description.match(/@[a-zA-Z0-9]+/);
        var userMentioned = arrayMentioned[0].substring(1);
        if(userMentioned != null){
            NotificationDispatcher.notifyUserMentioned(userMentioned, messageObj, chatId);
        }
    }

};

module.exports=CustomMarkupParser;
