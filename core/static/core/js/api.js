var GLOBALS = require('./globals'),
    $ = require('jquery');

var api = {

    getAllTickets: function(projectId, sendBackResult){

        $.getJSON(`${GLOBALS.API_BASE_URL}chat/`, { project__id: projectId })
            .success(function (chats) {
                var chatObjects = chats.objects;
                console.log(chatObjects);
                sendBackResult(chatObjects);
            });
    }

};

module.exports = api;