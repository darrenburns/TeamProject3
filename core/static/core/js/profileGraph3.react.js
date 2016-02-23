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


var ProfileGraph3 = React.createClass({


    render: function() {
        var data = {
            labels: ["Bug", "Blocking", "Feature", "Documentation", "Enhancement"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(166,43,228,0.5)",
                    strokeColor: "rgba(166,43,228,0.8)",
                    highlightFill: "rgba(166,43,228,0.75)",
                    highlightStroke: "rgba(166,43,228,1)",
                    data: [3, 1, 1, 7,2]
                }

            ]
        }
        return (
            <div>
                <h3>Types of conversations involved in</h3>
                <BarChart data={data} width="800" height="250"/>
            </div>
            )

    }



});


var mountPoint = document.getElementById('profile-graph3');
if (mountPoint !== null) {
    React.render(
        <ProfileGraph3/>,
        mountPoint
    );
}


moment.locale('en-gb');
module.exports = ProfileGraph3;