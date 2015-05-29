var React = require('react');

module.exports = Message = React.createClass({

    render: function() {
        var text = this.props.text;
        var dt = this.props.dt;
        return (
            <div className="message">
                {text}
            </div>
        )
    }

});