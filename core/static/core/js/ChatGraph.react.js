/**
 * Created by LeoLinhares on 06/07/2015.
 */

var React = require('react'),
    ReactFireMixin = require('reactfire'),
    Firebase = require('firebase');
var BarChart = require("react-chartjs").Bar;
var api = require('./api');
var GLOBALS = require('./globals');


var ChatGraph = React.createClass({

    ref : "",
    chatRef : "",
    participantsRef : "",
    mixins : [ReactFireMixin],

    getInitialState: function(){
        return {
            participants : "",
            projectId : PROJECT_ID,
            chatId: CHAT_ID
        }
    },

    componentWillMount: function(){
        var fbBaseUrl = GLOBALS.FIREBASE_BASE_URL;
        this.fbRef =
            new Firebase(`${fbBaseUrl}project/${this.state.projectId}`);
        this.chatRef = this.fbRef.child(`chats/${this.state.chatId}`);
        this.participantsRef = this.chatRef.child(`participants`);
        this.bindAsObject(this.participantsRef, 'participants');
    },

    componentWillReceiveProps: function(next){
        this.setState({
            refresh: next.refresh
        })
    },

    getInitialConfig: function(){
        var data = {
            labels: [],
            datasets: []
        };
        return data;
    },

    getDataset: function() {
        var data = this.getInitialConfig();
        //var participants = this.state.participants;
        //var k = [];
        //k = Object.keys(participants);
        //var values = Object.keys(participants).map(function (key) {
        //    return participants[key];
        //});



        var datapush = {
            "label": "Chat Graph",
            "fillColor": "rgba(220,220,220,0.5)",
            "strokeColor": "rgba(220,220,220,0.8)",
            "highlightFill": "rgba(220,220,220,0.75)",
            "highlightStroke": "rgba(220,220,220,1)",
            "data": [13,42,21]
        };
        data.labels.push("leo", "gustavo", "leonardo");
        data.datasets.push(datapush);
        return data;
    },

    render: function() {
        var chartData = this.getDataset();
        if(chartData.length != 0){
            return (<BarChart id="bar-chart-test" data={chartData} width="800" height="250"/>);
        }else{
            return false;
        }
    }
});

//var mountPoint = document.getElementById('chat-graph');
//if (mountPoint !== null) {
//    React.render(
//        <ChatGraph/>,
//        mountPoint
//    );
//}

module.exports = ChatGraph;