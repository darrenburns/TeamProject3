/**
 * Created by LeoLinhares on 24/06/2015.
 */

var React = require('react');

var Label = React.createClass({

    render: function () {
        var divStyle = {
            backgroundColor: this.props.labelColour
        };
        return(
            <span style={divStyle} className="label pull-right"> {this.props.labelName} </span>
        )
    }

});

module.exports = Label;