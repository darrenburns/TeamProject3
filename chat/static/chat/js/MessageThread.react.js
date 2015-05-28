var React = require('react'),
    ReactFireMixin = require('reactfire'),
    Firebase = require('firebase'),
    Message = require('./Message.react');


module.exports = MessageThread = React.createClass({
    mixins: [ReactFireMixin],

    getInitialState: function() {
        return {
            messages: []
        }
    },

    componentWillMount: function() {
        this.bindAsArray(new Firebase('https://torid-fire-4899.firebaseio.com'), 'messages');
    },

    componentDidMount: function() {
        console.log('ChatThread component has mounted');
    },

    render: function() {
        return (
            <div>
                Chat Thread:
                <Message />
                <Message />
            </div>
        )
    }

});

var mountPoint = document.getElementById('message-thread');
if (mountPoint !== null) {
    React.render(
        <MessageThread />,
        document.getElementById('message-thread')
    );
}
