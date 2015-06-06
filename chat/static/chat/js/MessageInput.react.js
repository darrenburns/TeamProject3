var React = require('react');

var MessageInput = React.createClass({

    getInitialState: function() {
        return {
            contents: ''
        }
    },

    /* Custom */
    handleChange(event) {
        var newActiveMessage = event.target.value;
        this.setState({contents: newActiveMessage});
        this.props.setConversationActiveMessage(newActiveMessage);
    },

    render: function() {
        return (
            <div id="message-input">
                <div className="row">
                    <div className="col-md-12">
                        <textarea className="form-control"
                                  rows="3"
                                  placeholder="Message"
                                  id="input-message"
                                  value={this.state.contents}
                                  onChange={this.handleChange}>
                        </textarea>
                    </div>
                </div>
            </div>
        )
    }

});

module.exports = MessageInput;