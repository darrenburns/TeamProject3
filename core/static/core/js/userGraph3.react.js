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


var UserGraph3 = React.createClass({
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
                    label: "Bugs",
                    fillColor: "rgba(71,102,255,0.2)",
                    strokeColor: "rgba(71,102,255,1)",
                    pointColor: "rgba(71,102,255,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [3, 1, 12, 1, 1, 5, 4]
                },
                {
                    label: "Enhancements",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [1, 0, 0, 2, 10, 5, 8]
                },
                {
                    label: "Blocking",
                    fillColor: "rgba(255,71,151,0.2)",
                    strokeColor: "rgba(255,71,151,0.1)",
                    pointColor: "rgba(255,71,151,0.1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(100,20,90,0.1)",
                    data: [4, 3, 1, 5, 2, 0, 2]
                },

                {
                    label: "Documentation",
                    fillColor: "rgba(255,219,71,0.2)",
                    strokeColor: "rgba(255,219,71,0.1)",
                    pointColor: "rgba(255,219,71,0.1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(100,20,90,0.1)",
                    data: [3, 0, 5, 1, 0, 1, 0]
                },
                {
                    label: "Features",
                    fillColor: "rgba(100,90,150,0.2)",
                    strokeColor: "rgba(100,90,150,0.1)",
                    pointColor: "rgba(100,90,150,0.1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(100,20,90,0.1)",
                    data: [12, 1, 3, 15, 20, 0, 0]
                }
            ]
        };

        return <div>
            <h3>Number of each message type per day</h3>
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
module.exports = UserGraph3;