var React = require('react'),
    Showdown = require('showdown'),
    moment = require('moment');

var Message = React.createClass({

    getInitialState: function() {
        return {
            converter: new Showdown.Converter()
        }
    },

    render: function() {
        var text = this.state.converter.makeHtml(this.props.text);
        var formattedTime = moment(this.props.dt).calendar();
        var user = this.props.user;
        return (
            <div className="message">
                <strong>{user}</strong> <em className="date">{formattedTime}</em>
                <p dangerouslySetInnerHTML={{__html: text}}
                   className="message-text"></p>
            </div>
        )
    }

});

module.exports = Message;