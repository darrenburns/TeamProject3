var React = require('react'),
    ReactFireMixin = require('reactfire'),
    Firebase = require('firebase'),
    $ = require('jquery'),
    Message = require('./Message.react'),
    ConversationFilter = require('./ConversationFilter.react'),
    ConversationParticipantsList = require('./ConversationParticipantsList.react'),
    GLOBALS = require('../../../../core/static/core/js/globals');


module.exports = Conversation = React.createClass({

    mixins: [ReactFireMixin],

    /* These are 'private' variables that can only be modified from the component itself. */
    getInitialState: function() {
        return {
            height: $(window).height() * 0.60,
            searchString: '',
            messages: [],
            participants: []
        }
    },

    componentWillMount: function() {
        var fbBaseUrl = GLOBALS.FIREBASE_BASE_URL;
        var ref =
            new Firebase(`${fbBaseUrl}project/${this.props.projectId}/chats/${this.props.chatId}`);
        var messagesInThread = ref.child('messages');
        var participants = ref.child('participants');

        this.bindAsArray(messagesInThread, 'messages');
        this.bindAsArray(participants, 'participants');
    },

    componentDidMount: function() {
        $('.messages').height(this.state.height);
        window.addEventListener('resize', this.handleWindowResize);
    },

    /* Custom */
    handleWindowResize: function(event) {
        this.setState({height: $(window).height() * 0.60});
        $('.messages').height(this.state.height);
    },

    /* Custom */
    setSearchString: function(str) {
        this.setState({searchString: str});
    },

    render: function() {
        var searchString = this.state.searchString;
        var messages = this.state.messages;
        var participants = this.state.participants;
        return (
            <div id="conversation-box" className="row">
                <div className="col-md-8">
                    <div className="messages">
                        {messages.map((msg, idx) => {
                            if (msg.desc.toLowerCase().indexOf(searchString) > -1) {
                                return <Message key={idx} text={msg.desc} dt={msg.dt} user={msg.user} userId={msg['user_id']}/>;
                            }
                        })}
                    </div>
                    <div id="message-input">
                        <textarea className="form-control" rows="3" placeholder="Message" id="input-message"></textarea>
                    </div>
                </div>
                <div className="col-md-4">
                    <h3>Filter</h3>
                    <ConversationFilter filterMessages={this.setSearchString}/>
                    <h3>Participants</h3>
                    <ConversationParticipantsList users={participants} />
                </div>
            </div>
        )
    }


});


/* If we're on the correct page, render the component,
   passing the current chat ID and project ID as props
   so that we can retrieve the messages from the Firebase. */
var mountPoint = document.getElementById('message-thread');
if (mountPoint !== null) {
    var currentChatId = CHAT_ID || -1;
    var currentProjectId = PROJECT_ID || -1;
    var currentUser = CURRENT_USER || '<< Anonymous User >>';
    React.render(<Conversation chatId={currentChatId} projectId={currentProjectId}/>, mountPoint);
}
