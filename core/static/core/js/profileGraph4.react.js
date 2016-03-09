/**
 * Created by LeoLinhares on 29/06/2015.
 */
var React = require('react'),
    ReactFireMixin = require('reactfire'),
    Firebase = require('firebase');
var BarChart = require("react-chartjs").Bar;
var api = require('./api');
var GLOBALS = require('./globals');
var moment = require('moment');


var ProfileGraph4 = React.createClass({


    render: function() {
        var data = {
            labels: ["Project A", "Project B", "Project 3"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(176,82,0,0.5)",
                    strokeColor: "rgba(176,82,0,0.8)",
                    highlightFill: "rgba(176,82,0,0.75)",
                    highlightStroke: "rgba(176,82,0,1)",
                    data: [3, 15, 11]
                }

            ]
        }
        return (
            <div>
                <h3>Total Contributions</h3>
                <BarChart data={data} width="800" height="250"/>
            </div>
            )

    }



});


var mountPoint = document.getElementById('profile-graph4');
if (mountPoint !== null) {
    React.render(
        <ProfileGraph4/>,
        mountPoint
    );
}


moment.locale('en-gb');
module.exports = ProfileGraph4;