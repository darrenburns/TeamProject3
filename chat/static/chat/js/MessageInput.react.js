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

        // TODO: Fix send empty messages

        var newActiveMessage = event.target.value;
        this.setState({contents: newActiveMessage});
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
            <div>

                <MessagePreview text={this.state.contents}/>

                <div id="message-input">
                    <div className="row">
                        <div className="col-md-12">
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
        )
    }

});

module.exports = MessageInput;