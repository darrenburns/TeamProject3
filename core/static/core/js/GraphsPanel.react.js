/**
 * Created by Euan
 */

var React = require('react');
var Graph = require('./Graph.react');
var Graph2 = require('./Graph2.react');
var userGraph = require('./userGraph.react');
var userGraph2 = require('./userGraph2.react');

var GraphsPanel = React.createClass({
    render: function(){
        return(
            <div className="graphs-panel">
                <Graph/>
                <Graph2/>
                <userGraph/>
                <userGraph2/>
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
