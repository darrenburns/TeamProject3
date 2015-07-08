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
            participants : {},
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

    getInitialConfig: function(){
        var data = {
            labels: [],
            datasets: []
        };
        return data;
    },

    getDataset: function() {
        var data = this.getInitialConfig();
        var participants = this.state.participants;
        console.log(participants);
        var values = [];
        var labels = [];
        if(participants != null){
            values = Object.keys(participants).map(function(k) { return participants[k] });
            labels = Object.keys(participants);
        }
        console.log(values);
        console.log(labels);

        var datapush = {
            "label": "Chat Graph",
            "fillColor": "rgba(220,220,220,0.5)",
            "strokeColor": "rgba(220,220,220,0.8)",
            "highlightFill": "rgba(220,220,220,0.75)",
            "highlightStroke": "rgba(220,220,220,1)",
            "data": values
        };
        data.labels = labels;
        data.datasets.push(datapush);
        return data;
    },

    render: function() {
        var chartData = this.getDataset();
        if(chartData.length != 0){
            return (
                <div>
                    <h3>Number of messages per participant</h3>
                    <BarChart id="bar-chart-test" data={chartData} width="600" height="250" />
                </div>
            );
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