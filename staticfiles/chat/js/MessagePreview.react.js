var React = require('react'),
    Showdown = require('showdown'),
    moment = require('moment');

var MessagePreview = React.createClass({

    getInitialState: function() {
        return {
            converter: new Showdown.Converter(),
            isVisible: false
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            isVisible: nextProps.text !== ''
        });
    },

    render: function() {
        var text = this.state.converter.makeHtml(this.props.text);
        var visibilityClass = this.state.isVisible ? 'show' : 'hidden';
        return (
            <div className={"message-preview " + visibilityClass}>
                <h4>Preview</h4>
                <p dangerouslySetInnerHTML={{__html: text}}
                   className="message-text"></p>
            </div>
        )
    }

});

module.exports = MessagePreview;