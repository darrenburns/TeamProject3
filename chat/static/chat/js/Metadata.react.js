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
            priorityList: [],
            allTags: [],
            chatTagList: [],
            cost: '0'
        }
    },

    componentWillMount: function() {
        api.getChatById(this.props.chatId, this.setChat);
        api.getPriority(this.setPriorityList);
        api.getAllTags(this.setAllTags);
    },

    setChat: function(chat){
        this.setState({
            priority: chat.ticket.priority,
            chatTagList: chat.ticket.tag,
            cost: chat.ticket.cost,
            ticketId: chat.ticket.id
        });
    },

    setPriority: function(chat_priority){
        this.setState({
            priority: chat_priority
        });
        api.setPriority(this.state.ticketId, chat_priority.id);
    },

    setPriorityList: function(priority_list){
        this.setState({
            priorityList: priority_list
        });
    },

    setAllTags: function(tag_list){
        this.setState({
            allTags: tag_list
        });
    },

    setChatTagList: function(chat_tag_list){
        this.setState({
            chatTagList: chat_tag_list
        });
    },

    setCost: function(chat_cost){
        this.setState({
            cost: chat_cost
        });
    },

    render: function() {
        return (
            <div className="row">
                <Tags allTags={this.state.allTags} chatTagList={this.state.chatTagList} setChatTagList={this.setChatTagList} chatId={this.props.chatId}/>
                <Priority priorityList={this.state.priorityList} priority={this.state.priority} setPriority={this.setPriority} chatId={this.props.chatId}/>
                <Cost cost={this.state.cost} setCost={this.setCost}/>
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