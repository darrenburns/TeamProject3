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


var ProfileGraph2 = React.createClass({


    render: function() {

        var data = {
            labels: ["Paul", "Michael", "Hannah", "April"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(92,228,43,0.5)",
                    strokeColor: "rgba(92,228,43,0.8)",
                    highlightFill: "rgba(92,228,43,0.75)",
                    highlightStroke: "rgba(92,228,43,1)",
                    data: [12, 5, 1, 2]
                }

            ]
        }
        return (
            <div>
                <h3>Who do I talk to</h3>
                <BarChart data={data} width="800" height="250"/>
            </div>
            )

    }



});


var mountPoint = document.getElementById('profile-graph2');
if (mountPoint !== null) {
    React.render(
        <ProfileGraph2/>,
        mountPoint
    );
}


moment.locale('en-gb');
module.exports = ProfileGraph2;