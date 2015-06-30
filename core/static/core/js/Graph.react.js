/**
 * Created by LeoLinhares on 29/06/2015.
 */
var React = require('react');
var LineChart = require("react-chartjs").Line;



var Graph = React.createClass({
    render: function() {
        var data = {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 86, 27, 90]
                },
                {
                    label: "My Third dataset",
                    fillColor: "rgba(234,123,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,112,123,1)",
                    data: [65, 59, 80, 23, 22, 55, 40]
                },
                {
                    label: "My Third dataset",
                    fillColor: "rgba(234,111,0,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,112,123,1)",
                    data: [0, 12, 22, 23, 47, 55, 40]
                }
            ]
        };
        console.log(data);
        return <LineChart data={data} width="800git" height="250"/>
    }
});

var mountPoint = document.getElementById('graph-chartjs');
if (mountPoint !== null) {
    React.render(
        <Graph/>,
        mountPoint
    );
}

module.exports = Graph;