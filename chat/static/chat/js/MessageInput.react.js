var React = require('react'),
    MessagePreview = require('./MessagePreview.react');

var MessageInput = React.createClass({

    getInitialState: function() {
        return {
            contents: ''
        }
    },

    /* Custom */
    handleChange(event) {
        var newActiveMessage = event.target.value;
        if (event.keyCode == 13 && (newActiveMessage === "" || newActiveMessage === "\n")){
            React.findDOMNode(this.refs['inputMessage']).value = '';
            newActiveMessage = "";
        }
        else if(event.keyCode == 13 && newActiveMessage !== "\n" && !event.shiftKey){
            React.findDOMNode(this.refs['inputMessage']).value = '';
            newActiveMessage = newActiveMessage.substring(0, newActiveMessage.length - 1); //Remove new paragraph char
            this.props.sendMessage(newActiveMessage);
            newActiveMessage = ""
        }
        this.setState({contents: newActiveMessage});
    },

    render: function() {
        return (
            <div>

                <div id="message-input">
                    <div className="row">
                        <div className="col-xs-12">
                            <div id="input-message-container">
                                <textarea className="form-control"
                                          rows="3"
                                          placeholder="Message"
                                          defaultValue={this.state.contents}
                                          id="input-message"
                                          ref="inputMessage"
                                          onKeyUp={this.handleChange}>
                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <MessagePreview text={this.state.contents}/>

            </div>
        )
    }

});

module.exports = MessageInput;