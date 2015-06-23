var React = require('react');
var DateCreated = require('./DateCreated.react');
var DateClosed = require('./DateClosed.react');
var Cost = require('./Cost.react');
var DueDate = require('./DueDate.react');
var Notes = require('./Notes.react');
var Tags = require('./Tags.react');
var Priority = require('./Priority.react');
var api = require('../../../../core/static/core/js/api');


var Metadata = React.createClass({

    getInitialState: function(){
        return{
            priority: '',
            priorityList: []
        }
    },

    componentWillMount: function() {
        api.getChatById(this.props.chatId, this.setChat);
        api.getPriority(this.setPriorityList);
    },

    setChat: function(chat){
        this.setState({
            priority: chat.ticket.priority
        });
    },

    setPriority: function(chat_priority){
        this.setState({
            priority: chat_priority
        });
    },

    setPriorityList: function(priority_list){
        this.setState({
            priorityList: priority_list
        });
    },

    render: function() {
        console.log(this.state.priority);
        console.log(this.state.priorityList);
        return (
            <div className="row">
                <Priority priorityList={this.state.priorityList} priority={this.state.priority} setPriority={this.setPriority} chatId={this.props.chatId}/>
            </div>
        )
    }
});

var mountPoint = document.getElementById('metadata-thread');
if (mountPoint !== null) {
    var currentChatId = CHAT_ID || -1;
    var currentProjectId = PROJECT_ID || -1;
    var currentUser = CURRENT_USER || '<< Anonymous User >>';
    React.render(<Metadata chatId={currentChatId} projectId={currentProjectId}/>, mountPoint);
}
module.exports = Metadata;