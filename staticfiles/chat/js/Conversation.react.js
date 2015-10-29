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
    GLOBALS = require('../../../../core/static/core/js/globals'),
    moment = require('moment'),
    CustomMarkupParser = require('./CustomMarkupParser'),
    api = require('../../../../core/static/core/js/api');


var Conversation = React.createClass({

    mixins: [ReactFireMixin],


    // TODO: Check if it is OK
    fbRef: '',
    messagesRef: '',
    participantsRef: '',
    statisticsRef: '',
    notificationsRef: '',

    /* These are 'private' variables that can only be modified from the component itself. */
    getInitialState: function() {
        return {
            //height: $(window).height() * 0.60,
            searchString: '',
            activeMessage: '',
            messages: [],
            savedMessages: [],
            participants: [],
            statistics: {},
            selectedUsers: Immutable.Set(),
            notifications: []
        }
    },

    componentWillReceiveProps: function(next){
        if(next) {
            this.setState({
                savedMessages: next.savedMessages
            });
        }
    },

    componentWillMount: function() {
        var fbBaseUrl = GLOBALS.FIREBASE_BASE_URL;
        this.fbRef =
            new Firebase(`${fbBaseUrl}project/${this.props.projectId}/chats/${this.props.chatId}`);
        this.notificationsRef = new Firebase(`${fbBaseUrl}notifications`);
        this.messagesRef = this.fbRef.child('messages');
        this.participantsRef = this.fbRef.child('participants');
        this.statisticsRef = this.fbRef.child('statistics');

        this.bindAsArray(this.messagesRef, 'messages');
        this.bindAsObject(this.participantsRef, 'participants');
        this.bindAsObject(this.statisticsRef, 'statistics');
        this.bindAsObject(this.notificationsRef, 'notifications');
    },

    componentDidUpdate: function(prevProp, prevState){
        if(this.state){
            if(prevState.messages.length != this.state.messages.length){
                var messageContainer = $('.messages');
                messageContainer[0].scrollTop = messageContainer[0].scrollHeight
            }
        }
    },

    componentDidMount: function() {
        this.handleWindowResize();
    },

    /* Custom */
    handleWindowResize: function(event) {
        var windowHeight = $(window).outerHeight();
        var navbarHeight = $(".navbar-default").outerHeight();
        var navTabsHeight = $(".nav-tabs").outerHeight();
        var messageInputHeight = $("#message-input").outerHeight();

        var maxHeight = (windowHeight * 0.92) - (navbarHeight + navTabsHeight + messageInputHeight);
        $('.messages').css("max-height", maxHeight + "px");
        $('.messages')[0].scrollTop = $('.messages')[0].scrollHeight
    },

    /* Custom */
    setSearchString: function(str) {
        this.setState({searchString: str});
    },

    /* Custom */
    setActiveMessage: function(str) {
        this.setState({activeMessage: str});
    },

    updateStatistics: function(){

        //Update the number of messages node

        var numberOfMessages = 0;
        var todayNumberOfMessages = 0;
        var messagesByDay = {};
        var statisticsObj = this.state.statistics;
        var today = moment().format('YYYY-MM-DD');

        if(statisticsObj != null){

            numberOfMessages = statisticsObj["numberOfMessages"];
            if(isNaN(numberOfMessages)){ numberOfMessages = 0 }


            messagesByDay = statisticsObj["messagesByDay"];
            if(messagesByDay != null) {
                var temp1 = messagesByDay[today];
                if(temp1 != null){
                    todayNumberOfMessages = temp1;
                }
            }
        }


        numberOfMessages = numberOfMessages + 1;
        todayNumberOfMessages = todayNumberOfMessages + 1;

        var pushJSON = '{ "numberOfMessages" : ' + numberOfMessages + '}';
        pushJSON = JSON.parse(pushJSON);

        var pushJSON2 = '{ "'+ today +'" : ' + todayNumberOfMessages + '}';
        pushJSON2 = JSON.parse(pushJSON2);

        this.statisticsRef.update(pushJSON);
        this.statisticsRef.child("messagesByDay").update(pushJSON2);


    },

    /* Custom */
    sendMessage: function(str) {


        var now = Date.now();
        var currentUser = this.props.currentUser;
        var messageObj = {
            desc: str,
            dt: now,
            user: currentUser,
            user_id:this.props.currentUserId,
            isStarred: false
        };

        this.setState({
            activeMessage: ''
        });

        var numberOfMessages = 0;
        var participantObjects = this.state.participants;
        if (participantObjects  != null) {
            numberOfMessages = participantObjects[currentUser];
        }

        if(isNaN(numberOfMessages)) { numberOfMessages = 0 }
        numberOfMessages = numberOfMessages + 1;

        var pushJSON = '{ "' + currentUser + '" : ' + numberOfMessages + ' }';
        pushJSON = JSON.parse(pushJSON);

        this.messagesRef.push(messageObj);
        CustomMarkupParser.parse(messageObj, this.props.chatId);
        this.participantsRef.update(pushJSON);
        this.updateStatistics();

        //TODO: Transform all shared properties into real properties of Root and then pass those to the children
        //Code below just for the demonstration, not use in production
        var sharedProperties = this.props.chatSharedProperties;
        var allTags = sharedProperties.allTags;
        var chatTagList = sharedProperties.chatTagList;


        var description = str;
        var arrayTag = description.match(/%[a-zA-Z0-9]+/);
        if(arrayTag != null){
            var tagMentioned = arrayTag[0].substring(1);
            if(tagMentioned != null && allTags != null){

                for(var i = 0; i < allTags.length; i++){
                    if(allTags[i].title.toLowerCase() == tagMentioned.toLowerCase()){
                        sharedProperties.chatTagList.push(allTags[i]);
                        api.setChatTagList(sharedProperties.ticketId, sharedProperties.chatTagList);
                        this.props.setChatSharedProperties(sharedProperties);
                        break;
                    }
                }

            }
        }
        var arrayCost = description.match(/\$[0-9]+/);

        if(arrayCost != null) {
           // var strCost = arrayCost[0].substring(1);
            //sharedProperties.cost.push(arrayCost[0]);
            api.setCost(sharedProperties.ticketId,arrayCost[0].substring(1));
            this.props.setChatSharedProperties(sharedProperties);

        }
/* //to be finished: priority once the priority has been fixed in the details tab
        var arrayPrio = description.match(/\^[a-zA-Z]+/);
        if (arrayPrio != null)
                var priorityMentioned = arrayPrio[0].substring[1];





        }*/

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
        var participants = [];

        if(this.state.participants) {
            participants = Object.keys(this.state.participants);
        }

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
                <div className="col-md-8" id="message-container">
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

moment.locale('en-GB');
module.exports = Conversation;