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


var UserGraph2 = React.createClass({
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
    participantRef: "",
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
        this.chatRef = this.fbRef.child('chats/');
        this.participantRef = this.charRef.child('participants');
        //chats/${this.state.chatId}
        this.bindAsObject(this.participantRef, 'participants');
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
                            var messageSize = (message.desc);
                            numberOfChatsPerDay[index2] = numberOfChatsPerDay[index2] +messageSize.length;                        }
                    });
                });

            });
            ds.push({
                "data" : numberOfChatsPerDay
            });
        });

        return ds;
    },
*/
    render: function() {
        var data = {
            labels: ["2016-02-10", "2016-02-11", "2016-02-12", "2016-02-13", "2016-02-14", "2016-02-15", "2016-02-16"],
            datasets: [
                {
                    label: "David",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [24, 46, 8, 16, 22, 56, 3]
                },
                {
                    label: "Mike",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [60, 5, 9, 2, 150, 50, 80]
                },
                {
                    label: "Paul",
                    fillColor: "rgba(100,20,90,0.2)",
                    strokeColor: "rgba(100,20,90,0.1)",
                    pointColor: "rgba(100,20,90,0.1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(100,20,90,0.1)",
                    data: [43, 33, 51, 15, 20, 100, 20]
                }
            ]
        };

        return <div>
            <h3>Content per day per participant (example data)</h3>
            <LineChart data={data} width="800" height="250"/>
        </div>

    }
});

/*
var mountPoint = document.getElementById('graph-chartjs4');
if (mountPoint !== null) {
    React.render(
        <userGraph2/>,
        mountPoint
    );
}
*/

moment.locale('en-gb');
module.exports = UserGraph2;