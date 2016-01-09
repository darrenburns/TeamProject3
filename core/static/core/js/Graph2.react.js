/**
 * Created by LeoLinhares on 29/06/2015.
 * Modified by Euan Parker
 */
var React = require('react'),
    ReactFireMixin = require('reactfire'),
    Firebase = require('firebase');
var LineChart = require("react-chartjs").Line;
var api = require('./api');
var GLOBALS = require('./globals');
var moment = require('moment');


var Graph2 = React.createClass({
    //functionDataAPI : function(){
    //
    //},
    //
    //functionDataFirebase : function(){
    //
    //},
    ref : "",
    chatRef : "",
    messageRef : "",
    mixins : [ReactFireMixin],

    getInitialState: function(){
        return {
            chats : [],
            projectId : PROJECT_ID
        }
    },
    getMessagesPerDay : function(){

    },

    componentWillMount: function(){
        var fbBaseUrl = GLOBALS.FIREBASE_BASE_URL;
        this.fbRef =
            new Firebase(`${fbBaseUrl}project/${this.state.projectId}`);
        this.chatRef = this.fbRef.child('chats/');
        //chats/${this.state.chatId}
        this.bindAsArray(this.chatRef, 'chats');
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

        chats.forEach(function (chat) {
            var numberOfChatsPerDay = [0,0,0,0,0,0,0];
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
                    if(diff == 0){
                        var messageSize = (message.desc);
                        numberOfChatsPerDay[index2] = numberOfChatsPerDay[index2] +messageSize.length;
                    }
                });
            });
            ds.push({
                "data" : numberOfChatsPerDay
            });
        });
        return ds;
    },

    render: function() {
        var data = this.getDataset();
        if(data.length > 0){
            var allOtherColors = ["rgba(0,67,88,1)","rgba(112,206,93,1)", "rgba(102,120,238,1)", "rgba(59,44,80,1)","rgba(203,6,170,1)", "rgba(163,169,201,1)","rgba(191,180,82,1)","rgba(63,126,11,1)", "rgba(55,119,196,1)","rgba(126,87,96,1)"];
            var fillColor = ["rgba(0,67,88,0.2)","rgba(112,206,93,0.2)", "rgba(102,120,238,0.2)", "rgba(59,44,80,0.2)","rgba(203,6,170,0.2)", "rgba(163,169,201,0.2)","rgba(191,180,82,0.2)","rgba(63,126,11,0.2)", "rgba(55,119,196,0.2)","rgba(126,87,96,0.2)"];
            var pointColor = "#fff";
            var x = this.getInitialConfig();

            for(var i = 0; i < 5; i++){
                var datapush = {};
                datapush = {
                    "label" : i+1,
                    "fillColor" : fillColor[i],
                    "strokeColor" : allOtherColors[i],
                    "pointColor" : allOtherColors[i],
                    "pointStrokeColor" : pointColor,
                    "pointHighlightFill" : pointColor,
                    "pointHighlightStroke" : allOtherColors[i],
                    "data" : data[i].data
                };
                x.datasets.push(datapush);
            }
            return <div>
                    <h3>Number of characters per day per chat</h3>
                        <LineChart data={x} width="800" height="250"/>
                    </div>
        }else{
            return false
        }
        //var colorArray = ["214,25,75", "112,206,93", "102,120,238", "59,44,80", "203,6,170", "163,169,201", "191,180,82", "63,126,11", "55,119,196", "126,87,96", "250,58,54", "80,61,160"];
        //, "198,143,158", "148,0,119", "107,152,17"


        //{
        //            label: "My First dataset",
        //            fillColor: "rgba(0,67,88,0.2)",
        //            strokeColor: "rgba(0,67,88,1)",
        //            pointColor: "rgba(0,67,88,1)",
        //            pointStrokeColor: "#fff",
        //            pointHighlightFill: "#fff",
        //            pointHighlightStroke: "rgba(0,67,88,1)",
        //            data: [65, 59, 80, 81, 56, 55, 40]
        //        },
        //        {
        //            label: "My Second dataset",
        //            fillColor: "rgba(31,118,112,0.2)",
        //            strokeColor: "rgba(31,118,112,1)",
        //            pointColor: "rgba(31,118,112,1)",
        //            pointStrokeColor: "#fff",
        //            pointHighlightFill: "#fff",
        //            pointHighlightStroke: "rgba(31,118,112,1)",
        //            data: [28, 48, 40, 19, 86, 27, 90]
        //        }
        //    data.datasets[0].data = meuArray;
        //api.getAllTickets(PROJECT_ID, functionDataAPI);
        //firebaseAPI.getAllChatName(1,functionDataFirebase);

        //{
        //            label: "1",
        //            fillColor: "rgba(214,25,75,0)",
        //            strokeColor: "rgba(214,25,75,1)",
        //            pointColor: "rgba(214,25,75,1)",
        //            pointStrokeColor: "#fff",
        //            pointHighlightFill: "#fff",
        //            pointHighlightStroke: "rgba(214,25,75,1)",
        //            data: []
        //        },
        //        {
        //            label: "2",
        //            fillColor: "rgba(112,206,93,0)",
        //            strokeColor: "rgba(112,206,93,1)",
        //            pointColor: "rgba(112,206,93,1)",
        //            pointStrokeColor: "#fff",
        //            pointHighlightFill: "#fff",
        //            pointHighlightStroke: "rgba(112,206,93,1)",
        //            data: []
        //        },
        //        {
        //            label: "3",
        //            fillColor: "rgba(102,120,238,0)",
        //            strokeColor: "rgba(102,120,238,1)",
        //            pointColor: "rgba(102,120,238,1)",
        //            pointStrokeColor: "#fff",
        //            pointHighlightFill: "#fff",
        //            pointHighlightStroke: "rgba(102,120,238,1)",
        //            data: []
        //        },
        //        {
        //            label: "4",
        //            fillColor: "rgba(59,44,80,0)",
        //            strokeColor: "rgba(59,44,80,1)",
        //            pointColor: "rgba(59,44,80,1)",
        //            pointStrokeColor: "#fff",
        //            pointHighlightFill: "#fff",
        //            pointHighlightStroke: "rgba(59,44,80,1)",
        //            data: []
        //        }
        //{
        //    label: "5",
        //    fillColor: "rgba(203,6,170,0.2)",
        //    strokeColor: "rgba(203,6,170,1)",
        //    pointColor: "rgba(203,6,170,1)",
        //    pointStrokeColor: "#fff",
        //    pointHighlightFill: "#fff",
        //    pointHighlightStroke: "rgba(203,6,170,1)",
        //    data: []
        //},
        //{
        //    label: "6",
        //    fillColor: "rgba(163,169,201,0.2)",
        //    strokeColor: "rgba(163,169,201,1)",
        //    pointColor: "rgba(163,169,201,1)",
        //    pointStrokeColor: "#fff",
        //    pointHighlightFill: "#fff",
        //    pointHighlightStroke: "rgba(163,169,201,1)",
        //    data: []
        //},
        //{
        //    label: "7",
        //    fillColor: "rgba(191,180,82,0.2)",
        //    strokeColor: "rgba(191,180,82,1)",
        //    pointColor: "rgba(191,180,82,1)",
        //    pointStrokeColor: "#fff",
        //    pointHighlightFill: "#fff",
        //    pointHighlightStroke: "rgba(191,180,82,1)",
        //    data: []
        //},
        //{
        //    label: "8",
        //    fillColor: "rgba(63,126,11,0.2)",
        //    strokeColor: "rgba(63,126,11,1)",
        //    pointColor: "rgba(63,126,11,1)",
        //    pointStrokeColor: "#fff",
        //    pointHighlightFill: "#fff",
        //    pointHighlightStroke: "rgba(63,126,11,1)",
        //    data: []
        //},
        //{
        //    label: "9",
        //    fillColor: "rgba(55,119,196,0.2)",
        //    strokeColor: "rgba(55,119,196,1)",
        //    pointColor: "rgba(55,119,196,1)",
        //    pointStrokeColor: "#fff",
        //    pointHighlightFill: "#fff",
        //    pointHighlightStroke: "rgba(55,119,196,1)",
        //    data: []
        //},
        //{
        //    label: "10",
        //    fillColor: "rgba(126,87,96,0.2)",
        //    strokeColor: "rgba(126,87,96,1)",
        //    pointColor: "rgba(126,87,96,1)",
        //    pointStrokeColor: "#fff",
        //    pointHighlightFill: "#fff",
        //    pointHighlightStroke: "rgba(126,87,96,1)",
        //    data: []
        //}

    }
});

var mountPoint = document.getElementById('graph-chartjs2');
if (mountPoint !== null) {
    React.render(
        <Graph2/>,
        mountPoint
    );
}


module.exports = Graph2;