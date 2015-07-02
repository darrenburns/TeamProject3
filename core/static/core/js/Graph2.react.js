///**
// * Created by LeoLinhares on 29/06/2015.
// */
//var React = require('react');
//var BarChart = require("react-chartjs").Bar;
//var firebaseAPI = require('./firebaseAPI');
//
//var Bar = React.createClass({
//    //functionDataAPI : function(){
//    //
//    //},
//    //
//    //functionDataFirebase : function(){
//    //
//    //},
//    getInitialConfig: function(){
//        var  allOtherColors = ["rgba(0,67,88,1)","rgba(112,206,93,1)", "rgba(102,120,238,1)", "rgba(59,44,80,1)","rgba(203,6,170,1)", "rgba(163,169,201,1)","rgba(191,180,82,1)","rgba(63,126,11,1)", "rgba(55,119,196,1)","rgba(126,87,96,1)"];
//        var fillColor = ["rgba(0,67,88,0.05)","rgba(112,206,93,0.05)", "rgba(102,120,238,0.05)", "rgba(59,44,80,0.05)","rgba(203,6,170,0.05)", "rgba(163,169,201,0.05)","rgba(191,180,82,0.05)","rgba(63,126,11,0.05)", "rgba(55,119,196,0.05)","rgba(126,87,96,0.05)"];
//
//        var data = {
//            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
//            datasets: [{
//                "label": 1,
//                "fillColor": fillColor[2],
//                "strokeColor": allOtherColors[2],
//                "highlightFill": allOtherColors[2],
//                "highlightStroke": allOtherColors[2],
//            }]
//        }
//        return data;
//    },
//
//    render: function() {
//        var data = this.getInitialConfig();
//        var ref = new Firebase("https://torid-fire-4899.firebaseio.com/");
//        var chatLengths = [];  // maps chat ids to the length of the chat
//        var actualChatLengths = [];
//        var projectChats = ref.child('project/' + PROJECT_ID);
//        projectChats.once('value', function (snap) {
//            var filteredChats = snap.val().chats.filter(function (elem) {
//                if (elem.closed) { // If the chat is closed or we have too many chats, abort...
//                    return elem.closed == false;
//                }
//                return true;
//            });
//
//
//            for (var i in filteredChats) {
//                if (typeof(filteredChats[i].messages) != 'undefined') {
//                    chatLengths[i] = [Object.keys(filteredChats[i].messages).length];
//                    actualChatLengths[i] = Object.keys(filteredChats[i].messages).length;
//                }
//            }
//        });
//        //var datapush = {};
//        //datapush = {"data" :actualChatLengths};
//        //data.datasets[0].push(datapush);
//        //console.log(data.datasets[0]);
//        //{
//        //            label: "My First dataset",
//        //            fillColor: "rgba(0,67,88,0.2)",
//        //            strokeColor: "rgba(0,67,88,1)",
//        //            pointColor: "rgba(0,67,88,1)",
//        //            pointStrokeColor: "#fff",
//        //            pointHighlightFill: "#fff",
//        //            pointHighlightStroke: "rgba(0,67,88,1)",
//        //            data: [65, 59, 80, 81, 56, 55, 40]
//        //        },
//        //        {
//        //            label: "My Second dataset",
//        //            fillColor: "rgba(31,118,112,0.2)",
//        //            strokeColor: "rgba(31,118,112,1)",
//        //            pointColor: "rgba(31,118,112,1)",
//        //            pointStrokeColor: "#fff",
//        //            pointHighlightFill: "#fff",
//        //            pointHighlightStroke: "rgba(31,118,112,1)",
//        //            data: [28, 48, 40, 19, 86, 27, 90]
//        //        }
//        //    data.datasets[0].data = meuArray;
//        //api.getAllTickets(PROJECT_ID, functionDataAPI);
//        //firebaseAPI.getAllChatName(1,functionDataFirebase);
//
//        //{
//        //            label: "1",
//        //            fillColor: "rgba(214,25,75,0)",
//        //            strokeColor: "rgba(214,25,75,1)",
//        //            pointColor: "rgba(214,25,75,1)",
//        //            pointStrokeColor: "#fff",
//        //            pointHighlightFill: "#fff",
//        //            pointHighlightStroke: "rgba(214,25,75,1)",
//        //            data: []
//        //        },
//        //        {
//        //            label: "2",
//        //            fillColor: "rgba(112,206,93,0)",
//        //            strokeColor: "rgba(112,206,93,1)",
//        //            pointColor: "rgba(112,206,93,1)",
//        //            pointStrokeColor: "#fff",
//        //            pointHighlightFill: "#fff",
//        //            pointHighlightStroke: "rgba(112,206,93,1)",
//        //            data: []
//        //        },
//        //        {
//        //            label: "3",
//        //            fillColor: "rgba(102,120,238,0)",
//        //            strokeColor: "rgba(102,120,238,1)",
//        //            pointColor: "rgba(102,120,238,1)",
//        //            pointStrokeColor: "#fff",
//        //            pointHighlightFill: "#fff",
//        //            pointHighlightStroke: "rgba(102,120,238,1)",
//        //            data: []
//        //        },
//        //        {
//        //            label: "4",
//        //            fillColor: "rgba(59,44,80,0)",
//        //            strokeColor: "rgba(59,44,80,1)",
//        //            pointColor: "rgba(59,44,80,1)",
//        //            pointStrokeColor: "#fff",
//        //            pointHighlightFill: "#fff",
//        //            pointHighlightStroke: "rgba(59,44,80,1)",
//        //            data: []
//        //        }
//        //{
//        //    label: "5",
//        //    fillColor: "rgba(203,6,170,0.2)",
//        //    strokeColor: "rgba(203,6,170,1)",
//        //    pointColor: "rgba(203,6,170,1)",
//        //    pointStrokeColor: "#fff",
//        //    pointHighlightFill: "#fff",
//        //    pointHighlightStroke: "rgba(203,6,170,1)",
//        //    data: []
//        //},
//        //{
//        //    label: "6",
//        //    fillColor: "rgba(163,169,201,0.2)",
//        //    strokeColor: "rgba(163,169,201,1)",
//        //    pointColor: "rgba(163,169,201,1)",
//        //    pointStrokeColor: "#fff",
//        //    pointHighlightFill: "#fff",
//        //    pointHighlightStroke: "rgba(163,169,201,1)",
//        //    data: []
//        //},
//        //{
//        //    label: "7",
//        //    fillColor: "rgba(191,180,82,0.2)",
//        //    strokeColor: "rgba(191,180,82,1)",
//        //    pointColor: "rgba(191,180,82,1)",
//        //    pointStrokeColor: "#fff",
//        //    pointHighlightFill: "#fff",
//        //    pointHighlightStroke: "rgba(191,180,82,1)",
//        //    data: []
//        //},
//        //{
//        //    label: "8",
//        //    fillColor: "rgba(63,126,11,0.2)",
//        //    strokeColor: "rgba(63,126,11,1)",
//        //    pointColor: "rgba(63,126,11,1)",
//        //    pointStrokeColor: "#fff",
//        //    pointHighlightFill: "#fff",
//        //    pointHighlightStroke: "rgba(63,126,11,1)",
//        //    data: []
//        //},
//        //{
//        //    label: "9",
//        //    fillColor: "rgba(55,119,196,0.2)",
//        //    strokeColor: "rgba(55,119,196,1)",
//        //    pointColor: "rgba(55,119,196,1)",
//        //    pointStrokeColor: "#fff",
//        //    pointHighlightFill: "#fff",
//        //    pointHighlightStroke: "rgba(55,119,196,1)",
//        //    data: []
//        //},
//        //{
//        //    label: "10",
//        //    fillColor: "rgba(126,87,96,0.2)",
//        //    strokeColor: "rgba(126,87,96,1)",
//        //    pointColor: "rgba(126,87,96,1)",
//        //    pointStrokeColor: "#fff",
//        //    pointHighlightFill: "#fff",
//        //    pointHighlightStroke: "rgba(126,87,96,1)",
//        //    data: []
//        //}
//
//        return <BarChart data={data} width="800" height="250"/>
//    }
//});
//
//var mountPoint = document.getElementById('graph-chartjs1');
//if (mountPoint !== null) {
//    React.render(
//        <Bar/>,
//        mountPoint
//    );
//}
//
//module.exports = Bar;