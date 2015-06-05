var React = require('react');

var MessageInput = React.createClass({

    getInitialState: function() {
        return {
            contents: ''
        }
    },

    /* Custom */
    handleChange(event) {
        this.setState({contents: event.target.value});
    },

    render: function() {
        return (
            <div id="message-input">
                <textarea className="form-control"
                          rows="3"
                          placeholder="Message"
                          id="input-message"
                          value={this.state.contents}
                          onChange={this.handleChange}>
                </textarea>
            </div>
        )
    }

});

module.exports = MessageInput;