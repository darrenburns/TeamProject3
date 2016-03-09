/**
 * Created by LeoLinhares on 29/06/2015.
 * modified by Euan Parker
 */
var React = require('react'),
    ReactFireMixin = require('reactfire'),
    Firebase = require('firebase');
var LineChart = require("react-chartjs").Line;
var api = require('./api');
var GLOBALS = require('./globals');
var moment = require('moment');


var ProfileGraph = React.createClass({
    //functionDataAPI : function(){
    //
    //},
    //
    //functionDataFirebase : function(){
    //
    //},
/*    ref : "",
    chatRef : "",
    messageRef : "",
    participantsRef: "",
    mixins : [ReactFireMixin],

    getInitialState: function(){
        return {
            chats : [],
            projectId : PROJECT_ID,
            participants : {}
        }
    },
    getMessagesPerDay : function(){

    },

    componentWillMount: function(){
        var fbBaseUrl = GLOBALS.FIREBASE_BASE_URL;
        this.fbRef =
            new Firebase(`${fbBaseUrl}project/${this.state.projectId}`);
        this.chatRef = this.fbRef.child(`chats/1`);
        this.participantsRef = this.chatRef.child(`participants`);
        this.bindAsObject(this.participantsRef, `participants`);
    },

    getDays : function () {
        var days = [];
        for(var i = -6; i <= 0 ; i++){
            days.push(moment().add(i,'day').format('YYYY-MM-DD'));
        }
        return days;
    },

    getInitialConfig: function(){
        var data = {
            labels: this.getDays(),
            datasets: []
        };
        return data;
    },

    getDataset : function() {
        var days = this.getDays();
        var chats = this.state.chats;
        var ds = [];
        var participants = this.state.participants;
        participants.forEach(function (participant){
            var numberOfChatsPerDay = [0,0,0,0,0,0,0];



            chats.forEach(function (chat) {
                var messages = chat.messages;
                var messagesFormatted = Object.keys(messages).map(function(k) { return messages[k] });
                //participants = this.state.participants
                //arraydevalores = Object.keys(participants).map(function(k) { return participants[k] });
                //arraydelabels = object.keys(participants)
                messagesFormatted.forEach(function(message, index){
                    var messageDay = moment(message.dt).format('YYYY-MM-DD');
                    var messageDay2 = moment(messageDay);
                    days.forEach(function(date, index2){
                        var diff = messageDay2.diff(date,'days');
                        if(diff == 0 && participant == message.user){
                            numberOfChatsPerDay[index2] = numberOfChatsPerDay[index2] +1;
                        }
                    });
                });

            });
            ds.push({
                "data" : numberOfChatsPerDay
            });
        });

        return ds;
    },*/

    render: function() {
        var data = {
            labels: ["2016-02-10", "2016-02-11", "2016-02-12", "2016-02-13", "2016-02-14", "2016-02-15", "2016-02-16"],
            datasets: [
                {
                    label: "Project 1",
                    fillColor: "rgba(218,105,18,0.2)",
                    strokeColor: "rgba(218,105,18,1)",
                    pointColor: "rgba(218,105,18,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [12, 23, 4, 8, 11, 22, 1]
                },
                {
                    label: "Project 2",
                    fillColor: "rgba(18,211,218,0.2)",
                    strokeColor: "rgba(18,211,218,1)",
                    pointColor: "rgba(18,211,218,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [32, 2, 4, 19, 100, 25, 45]
                },

            ]
        };

        return <div>
            <h3>My contributions per project over time</h3>
            <LineChart data={data} width="800" height="250"/>
        </div>

    }
});

var mountPoint = document.getElementById('profile-graph');
if (mountPoint !== null) {
    React.render(
        <ProfileGraph/>,
        mountPoint
    );
}

moment.locale('en-gb');
module.exports = ProfileGraph;