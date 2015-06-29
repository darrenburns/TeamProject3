var React = require('react'),
    ReactFireMixin = require('reactfire'),
    Firebase = require('firebase'),
    $ = require('jquery'),
    Message = require('./Message.react'),
    MessageInput = require('./MessageInput.react'),
    MessagePreview = require('./MessagePreview.react'),
    Immutable = require('immutable'),
    ConversationFilter = require('./ConversationFilter.react'),
    ConversationParticipantsList = require('./ConversationParticipantsList.react'),
    GLOBALS = require('../../../../core/static/core/js/globals');


var Conversation = React.createClass({

    mixins: [ReactFireMixin],


    // TODO: Check if it is OK
    fbRef: '',
    messagesRef: '',
    participantsRef: '',

    /* These are 'private' variables that can only be modified from the component itself. */
    getInitialState: function() {
        return {
            //height: $(window).height() * 0.60,
            searchString: '',
            activeMessage: '',
            messages: [],
            savedMessages: [],
            participants: [],
            selectedUsers: Immutable.Set(),
        }
    },

    componentWillMount: function() {
        var fbBaseUrl = GLOBALS.FIREBASE_BASE_URL;
        this.fbRef =
            new Firebase(`${fbBaseUrl}project/${this.props.projectId}/chats/${this.props.chatId}`);
        this.messagesRef = this.fbRef.child('messages');
        this.participantsRef = this.fbRef.child('participants');
        this.bindAsArray(this.messagesRef, 'messages');
        this.bindAsArray(this.participantsRef, 'participants');
        this.bindAsArray(
            this.messagesRef.
            orderByChild("isStarred").
            equalTo(true),
            'savedMessages'
        )
    },

    componentDidUpdate: function(prevProp, prevState){
        $(document).ready(function(){
            var messageContainer = $('.messages');
            messageContainer[0].scrollTop = messageContainer[0].scrollHeight
        });
    },

    componentDidMount: function() {
        //$('.messages').height(this.state.height);
        //window.addEventListener('resize', this.handleWindowResize);
    },

    /* Custom */
    handleWindowResize: function(event) {
        //this.setState({height: $(window).height() * 0.60});
        //$('.messages').height(this.state.height);
    },

    /* Custom */
    setSearchString: function(str) {
        this.setState({searchString: str});
    },

    /* Custom */
    setActiveMessage: function(str) {
        this.setState({activeMessage: str});
    },

    /* Custom */
    sendMessage: function(str) {
        var now = Date.now();
        var messageObj = {
            desc: str,
            dt: now,
            user: this.props.currentUser,
            user_id:this.props.currentUserId,
            isStarred: false
        };
        this.setState({
            activeMessage: ''
        });
        this.messagesRef.push(messageObj);
    },

    updateStarAtFirebase: function(snapshot){

        var key = snapshot.key();
        var value = snapshot.val();
        var isStarred = !value.isStarred;

        this.messagesRef.child("/"+key).child("isStarred").set(isStarred);

    },

    setStar: function(isStarred, index){

        var messagesArray = this.state.messages;
        var searchByDate = messagesArray[index].dt;

        this.messagesRef.
            orderByChild("dt").
            equalTo(searchByDate).
            once("child_added", this.updateStarAtFirebase);

    },

    /* Custom */
    toggleUserSelect: function(userName) {
        if (userName.length === 0) return;
        if (!this.state.selectedUsers.includes(userName)){
            this.setState({
                selectedUsers: this.state.selectedUsers.add(userName)
            });
        } else {
            this.setState({
                selectedUsers: this.state.selectedUsers.delete(userName)
            });
        }
    },

    render: function() {

        var searchString = this.state.searchString;
        var messages = this.state.messages;
        var participants = this.state.participants;
        var filteredMessages = [];
        messages.forEach((msg, idx) => {
            if ((msg.desc.toLowerCase().indexOf(searchString.toLowerCase()) > -1 || searchString === '') &&
                (this.state.selectedUsers.contains(msg.user) || this.state.selectedUsers.count() == 0)) {
                filteredMessages.push(<Message key={idx}
                                               text={msg.desc}
                                               index={idx}
                                               dt={msg.dt}
                                               user={msg.user}
                                               userId={msg['user_id']}
                                               isStarred={msg.isStarred}
                                               setStar={this.setStar}
                                               searchString={searchString} />);
            }
        });
        return (
            <div id="conversation-box" className="row">
                <div className="col-md-8">
                    <div className="messages">
                        {filteredMessages}
                    </div>
                    <MessageInput setConversationActiveMessage={this.setActiveMessage} sendMessage={this.sendMessage} />
                </div>
                <div className="col-md-4">
                    <h4>
                        Filter <small className={filteredMessages.length !== messages.length ? 'text-danger' : null}>
                        (showing {filteredMessages.length}/{messages.length} messages)
                    </small>
                    </h4>
                    <ConversationFilter filterMessages={this.setSearchString} />
                    <h4>Participants <small>({participants.length})</small></h4>
                    <ConversationParticipantsList users={participants}
                                                  toggleUser={this.toggleUserSelect} />
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
    var currentUserId = CURRENT_USER_ID || -1;
    React.render(
        <Conversation
            chatId={currentChatId}
            projectId={currentProjectId}
            currentUser={currentUser}
            currentUserId={currentUserId}/>,
        mountPoint
    );
}

module.exports = Conversation;