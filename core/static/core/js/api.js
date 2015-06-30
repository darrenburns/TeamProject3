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
    },

    getAllTags: function(sendBackResult){

        $.getJSON(`${GLOBALS.API_BASE_URL}tag/`)
            .success(function (tagListObject) {
                var tagList = tagListObject.objects;
                sendBackResult(tagList);
            });
    },

    setPriority: function(ticketId, priorityId){
        var passData = {
            "priority": `${GLOBALS.API_BASE_URL}priority/${priorityId}/`
        };
        $.ajax({
            url: `${GLOBALS.API_BASE_URL}ticket/${ticketId}/`,
            type: "PATCH",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(passData)
        });
    },

    setDueDate: function(ticketId, dueDate){
        var passData = {
            "due_date": dueDate
        };
        $.ajax({
            url: `${GLOBALS.API_BASE_URL}ticket/${ticketId}/`,
            type: "PATCH",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(passData)
        });
    },

    setChatTagList: function(ticketId, chatTagList){
        var passData = {
            "tag": chatTagList
        };
        $.ajax({
            url: `${GLOBALS.API_BASE_URL}ticket/${ticketId}/`,
            type: "PATCH",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(passData)
        });
    },

    setCost: function (ticketId, cost) {
        var passData = {
            "cost": cost
        };
        $.ajax({
            url: `${GLOBALS.API_BASE_URL}ticket/${ticketId}/`,
            type: "PATCH",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(passData)
        });
    },

    setNotes: function (ticketId, notes) {
        var passData = {
            "notes": notes
        };
        $.ajax({
            url: `${GLOBALS.API_BASE_URL}ticket/${ticketId}/`,
            type: "PATCH",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(passData)
        });
    },

    setClosedDate: function (chatId, date) {
        var passData = {
            "closed": date
        };
        $.ajax({
            url: `${GLOBALS.API_BASE_URL}chat/${chatId}/`,
            type: "PATCH",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(passData)
        });
    }

};

module.exports = api;