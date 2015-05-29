var React = require('react'),
    Showdown = require('showdown');

module.exports = Message = React.createClass({

    getInitialState: function() {
        return {
            converter: new Showdown.Converter()
        }
    },

    render: function() {
        var text = this.state.converter.makeHtml(this.props.text);
        var dt = this.props.dt;
        return (
            <div className="triangle-right right">
                <p dangerouslySetInnerHTML={{__html: text}}
                   className="message-text"></p>
            </div>
        )
    }

});