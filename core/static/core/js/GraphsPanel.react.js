/**
 * Created by Euan
 */

var React = require('react');
var Graph = require('./Graph.react');
var Graph2 = require('./Graph2.react');
var UserGraph = require('./userGraph.react');
var UserGraph2 = require('./userGraph2.react');
var UserGraph3 = require('./userGraph3.react');


var GraphsPanel = React.createClass({
    render: function(){
        return(
            <div className="graphs-panel">
                <Graph/>
                <Graph2/>
                <UserGraph/>
                <UserGraph2/>
                <UserGraph3/>

            </div>

        )
    }


});
var mountPoint = document.getElementById('graphs-panel-mount');
if(mountPoint != null){
    React.render(
        <GraphsPanel/>,
        mountPoint
    )
}
