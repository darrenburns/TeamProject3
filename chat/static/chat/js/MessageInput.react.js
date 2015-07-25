var React = require('react'),
    MessagePreview = require('./MessagePreview.react');

var MessageInput = React.createClass({

    getInitialState: function() {
        return {
            contents: ''
        }
    },

    /* Custom */
    handleKeyUp(event) {
        var newActiveMessage = event.target.value.trim();
        this.setState({contents: newActiveMessage});
    },

    handleKeyDown: function(event){
        var auxMessage = event.target.value;
        var auxMessage2 = auxMessage;
        auxMessage = auxMessage.replace(/\r\n|\n|\r| /g, ""); //Avoid sending empty messages
        if (event.keyCode == 13 && !event.shiftKey && auxMessage == ""){ //When ENTER is hit with no message: Block
            event.preventDefault();
        } else if(event.keyCode == 13 && !event.shiftKey && auxMessage !== ""){
            event.preventDefault();
            React.findDOMNode(this.refs['inputMessage']).value = '';
            this.props.sendMessage(auxMessage2);
        }
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
                                          onKeyDown={this.handleKeyDown}
                                          onKeyUp={this.handleKeyUp}>
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