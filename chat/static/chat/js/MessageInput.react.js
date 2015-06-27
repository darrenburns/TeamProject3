var React = require('react');

var MessageInput = React.createClass({

    getInitialState: function() {
        return {
            contents: ''
        }
    },

    /* Custom */
    handleChange(event) {

        // TODO: Fix preview performance issue

        var newActiveMessage = event.target.value;
        this.setState({contents: newActiveMessage});
        this.props.setConversationActiveMessage(newActiveMessage);

        if (event.keyCode == 13 && newActiveMessage === ""){
            event.preventDefault();
        }
        else if(event.keyCode == 13 && newActiveMessage !== "" && !event.shiftKey){
            this.props.sendMessage(newActiveMessage);
            this.setState({contents: ''});
            React.findDOMNode(this.refs['inputMessage']).value = '';
        }
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
                                  ref="inputMessage"
                                  onChange={this.handleChange}>
                        </textarea>
                    </div>
                </div>
            </div>
        )
    }

});

module.exports = MessageInput;