var React = require('react'),
    $ = require('jquery'),
    bootstrap = require('bootstrap'),
    Sidebar = require('./Sidebar.react'),
    Conversation = require('../../../../chat/static/chat/js/Conversation.react'),
    Metadata = require('../../../../chat/static/chat/js/Metadata.react'),
    SavedMessages = require('../../../../chat/static/chat/js/SavedMessages.react'),
    ReactFireMixin = require('reactfire'),
    GLOBALS = require('./globals');


var Root = React.createClass({

    mixins: [ReactFireMixin],


    // TODO: Check if it is OK
    fbRef: '',
    messagesRef: '',

    getInitialState: function(){
        return {
            savedMessages: [],
            chatSharedProperties: null
        }
    },

    componentWillMount: function(){
        var fbBaseUrl = GLOBALS.FIREBASE_BASE_URL;
        this.fbRef =
            new Firebase(`${fbBaseUrl}project/${this.props.currentProjectId}/chats/${this.props.currentChatId}`);
        this.messagesRef = this.fbRef.child('messages');
        this.bindAsArray(
            this.messagesRef.
                orderByChild("isStarred").
                equalTo(true),
            'savedMessages')
    },

    setChatSharedProperties: function(properties){
        this.setState({
           chatSharedProperties : properties
        });
    },

    render: function(){
        return (
            <div>
                <div className="col-xs-12 col-sm-3 sidebar">

                    <div className="row">

                        <div className="col-sm-12" id="sidebar">
                            <Sidebar
                                chatSharedProperties={this.state.chatSharedProperties}
                                chatId={this.props.currentChatId}
                                projectId={this.props.currentProjectId}
                                />
                        </div>

                    </div>

                </div>

                <div className="remodal-bg">
                    <div className="col-xs-12 col-sm-9 main">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="nav nav-tabs">
                                    <li role="presentation" className="active">
                                        <a role="tab" data-toggle="tab" href="#tab-chats">Chat <i className="fa fa-comments-o"></i>
                                        </a>
                                    </li>
                                    <li role="presentation">
                                        <a role="tab" data-toggle="tab" href="#tab-information" id="open-tab-information">Details <i className="fa fa-question-circle"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a role="tab" data-toggle="tab" href="#tab-visualisations" id="open-tab-visualisations">Statistics <i className="fa fa-bar-chart"></i></a>
                                    </li>

                                </ul>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-sm-12">

                                <div className="tab-content">


                                    <div role="tabpanel" className="tab-pane active" id="tab-chats">
                                        <div id="message-thread">
                                            <Conversation
                                                chatId={this.props.currentChatId}
                                                projectId={this.props.currentProjectId}
                                                currentUser={this.props.currentUser}
                                                currentUserId={this.props.currentUserId}
                                                savedMessages={this.state.savedMessages}
                                                />
                                        </div>
                                    </div>

                                    <div role="tabpanel" className="tab-pane" id="tab-information">

                                        <div id="metadata-thread">
                                            <div className="row">
                                                <Metadata setChatSharedProperties={this.setChatSharedProperties} chatId={this.props.currentChatId} projectId={this.props.currentProjectId}/>
                                                <SavedMessages savedMessages={this.state.savedMessages} chatId={this.props.currentChatId} projectId={this.props.currentProjectId} />
                                            </div>
                                        </div>
                                    </div>


                                    <div role="tabpanel" className="tab-pane" id="tab-visualisations">
                                        <div className="chat-vis-container chat-visualisations" id="bacon">
                                            <h4>Number of messages per participant:</h4>
                                        </div>
                                    </div>


                                    <div role="tabpanel" className="tab-pane" id="tab-users">Users content</div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

});

var mountPoint = document.getElementById('root-mount');

if (mountPoint !== null) {
    var currentChatId = CHAT_ID || -1;
    var currentProjectId = PROJECT_ID || -1;
    var currentUser = CURRENT_USER || '<< Anonymous User >>';
    var currentUserId = CURRENT_USER_ID || -1;
    React.render(
        <Root
            currentChatId={currentChatId}
            currentProjectId={currentProjectId}
            currentUser={currentUser}
            currentUserId={currentUserId}
            />,
        mountPoint
    );
}

module.exports=Root;