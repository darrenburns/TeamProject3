/**
 * Created by LeoLinhares on 24/06/2015.
 */

var React = require('react');

var Label = React.createClass({

    render: function () {
        if(this.props.priority != null) {
            if(this.props.priority.name === "High"){
                var divStyle = {
                    color: this.props.priority.colour,
                    paddingLeft: 5
                };
                return (
                    <i className="fa fa-exclamation" style={divStyle}></i>
                )
            }else{
                return (null)
            }
        }else{
            return (null)
        }
    }

});

module.exports = Label;