/**
 * Created by LeoLinhares on 08/07/2015.
 */

var React = require('react'),
    ReactFireMixin = require('reactfire'),
    Firebase = require('firebase');
var BarChart = require("react-chartjs").Bar;
var api = require('./api');
var GLOBALS = require('./globals');


var ProjectGraph = React.createClass({

    ref : "",
    chatRef : "",
    mixins : [ReactFireMixin],

    getInitialState: function(){
        return {
            chats: [],
            projectId: PROJECT_ID,
            chatsApi: []
        }
    },

    componentWillMount: function(){
        var fbBaseUrl = GLOBALS.FIREBASE_BASE_URL;
        this.fbRef =
            new Firebase(`${fbBaseUrl}project/${this.state.projectId}`);
        this.chatRef = this.fbRef.child(`chats/`);
        this.bindAsObject(this.chatRef, 'chats');
        api.getAllTickets(this.props.projectId, this.saveChatsInfo);
    },

    getInitialConfig: function(){
        var data = {
            labels: [],
            datasets: []
        };
        return data;
    },

    saveChatsInfo : function(chats){
        var x = [];
        chats.forEach(function (chat) {
            var info = {};
            info = {
                "index": chat.id,
                "title": chat.title
            };
            x.push(info);
        });
        this.setState({
            chatsApi : x
        });
    },

    getDataset: function() {
        var data = this.getInitialConfig();
        var chats = this.state.chats;
        var chatsTitles = this.state.chatsApi;
        console.log(chatsTitles);
        if(chats != null && chatsTitles != null) {
            var values = [];
            var indexes = [];
            var labels = [];
            var i = 0;
            Object.keys(chats).forEach(function(key) {
                console.log(key);
                var statistics = chats[key].statistics;
                values[i] = statistics.numberOfMessages;
                Object.keys(chatsTitles).forEach(function(key1){
                    if(chatsTitles[key1].index == key ){
                        labels[i] = chatsTitles[key1].title;
                    }
                });
                i++;
            });
        }
        if(labels.length > 0 && values.length > 0) {
            data.labels = labels;

            console.log(values);
            var datapush = {
                "label": "Chat Graph2",
                "fillColor": "rgba(220,220,220,0.5)",
                "strokeColor": "rgba(220,220,220,0.8)",
                "highlightFill": "rgba(220,220,220,0.75)",
                "highlightStroke": "rgba(220,220,220,1)",
                "data": values
            };
            data.datasets.push(datapush);
            return data;
        }

    },

    render: function() {
        var chartData = this.getDataset();
        if(chartData != null){
            return (
                <div>
                    <h3>Total Number of Messages per Chat</h3>
                    <BarChart data={chartData} width="800" height="250" />
                </div>
            );
        }else{
            return (<h3>Leo</h3>);
        }
    }
});

var mountPoint = document.getElementById('graph-chartjs1');
if (mountPoint !== null) {
    React.render(
        <ProjectGraph/>,
        mountPoint
    );
}

module.exports = ProjectGraph;