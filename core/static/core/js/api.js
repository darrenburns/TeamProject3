var GLOBALS = require('./globals'),
    $ = require('jquery');

var api = {

    getAllTickets: function(projectId, sendBackResult){

        $.getJSON(`${GLOBALS.API_BASE_URL}chat/`, { project__id: projectId })
            .success(function (chats) {
                var chatObjects = chats.objects;
                sendBackResult(chatObjects);
            });
    },

    getAllTickets2: function(sendBackResult){

        $.getJSON(`${GLOBALS.API_BASE_URL}chat/`)
            .success(function (chats) {
                var chatObjects = chats.objects;
                sendBackResult(chatObjects);
            });
    },

    getAllProjects: function(sendBackResult){

        $.getJSON(`${GLOBALS.API_BASE_URL}project/`)
            .success(function (project) {
                var projectObjects = project.objects;
                sendBackResult(projectObjects);
            });
    },

    getChatById: function(chatId, sendBackResult){

        $.getJSON(`${GLOBALS.API_BASE_URL}chat/${chatId}`)
            .success(function (chat) {
                sendBackResult(chat);
            });
    },

    getPriority: function(sendBackResult){

        $.getJSON(`${GLOBALS.API_BASE_URL}priority/`)
            .success(function (priorityListObject) {
                var priorityList = priorityListObject.objects;
                sendBackResult(priorityList);
            });
    }

};

module.exports = api;