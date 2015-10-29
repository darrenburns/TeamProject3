var React = require('react');
var DateCreated = require('./DateCreated.react');
var DateClosed = require('./DateClosed.react');
var Cost = require('./Cost.react');
var DueDate = require('./DueDate.react');
var Notes = require('./Notes.react');
var Tags = require('./Tags.react');
var Priority = require('./Priority.react');
var Assignee = require('./Assignee.react');
var NotificationDispatcher = require('./NotificationDispatcher');
var api = require('../../../../core/static/core/js/api');


var Metadata = React.createClass({

    getInitialState: function(){
        return{
            priority: '',
            priorityList: [],
            allTags: [],
            chatTagList: [],
            cost: '0',
            dueDate: '',
            dateCreated: '',
            dateClosed: '',
            ticketId: '',
            notes: '',
            userList: [],
            assignee: ''
        }
    },

    componentWillMount: function() {
        api.getChatById(this.props.chatId, this.setChat);
        api.getPriority(this.setPriorityList);
        api.getAllTags(this.setAllTags);
        api.getAllUsers(this.setAllUsers);
    },

    setChat: function(chat){
        this.setState({
            priority: chat.ticket.priority,
            chatTagList: chat.ticket.tag,
            cost: chat.ticket.cost,
            ticketId: chat.ticket.id,
            dateCreated: chat.created,
            dateClosed: chat.closed,
            notes: chat.ticket.notes,
            dueDate: chat.ticket.due_date,
            assignee: chat.ticket.user
        });

        var chatSharedProperties= this.props.chatSharedProperties;
        chatSharedProperties.chatTagList = chat.ticket.tag;
        chatSharedProperties.ticketId = chat.ticket.id;
        chatSharedProperties.cost = chat.ticket.cost;
        chatSharedProperties.priority = chat.ticket.priority;
        this.props.setChatSharedProperties(chatSharedProperties);

    },

    setAllUsers: function(users){
        this.setState({
            userList: users
        });
    },

    setPriority: function(chat_priority){
        this.setState({
            priority: chat_priority
        });
        api.setPriority(this.state.ticketId, chat_priority.id);
        var chatSharedProperties = this.props.chatSharedProperties;
        chatSharedProperties.priority = chat_priority;
        chatSharedProperties.id = this.props.chatId;
        this.props.setChatSharedProperties(chatSharedProperties);
        var priority = chat_priority.name;
        this.notifyUsers(null, priority);
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

        var chatSharedProperties= this.props.chatSharedProperties;
        chatSharedProperties.allTags = tag_list;
        this.props.setChatSharedProperties(chatSharedProperties);
    },

    setChatTagList: function(chat_tag_list){
        this.setState({
            chatTagList: chat_tag_list
        });
        api.setChatTagList(this.state.ticketId, chat_tag_list);
        var chatSharedProperties= this.props.chatSharedProperties;
        chatSharedProperties.chatTagList = chat_tag_list;
        chatSharedProperties.id = this.props.chatId;
        this.props.setChatSharedProperties(chatSharedProperties);
    },

    setCost: function(chat_cost){
        this.setState({
            cost: chat_cost
        });
        api.setCost(this.state.ticketId, chat_cost);
        this.notifyUsers(chat_cost, null);
    },

    notifyUsers: function(chat_cost, priority){
        var allUsers = this.state.userList;
        var newCost = chat_cost;
        var newPriority = priority;
        var chatId = this.props.chatId;
        var author = this.props.currentUser;
        if(chatId !== null){
            NotificationDispatcher.notifyAllUsers(allUsers, newCost , chatId, author, newPriority);
        }
    },

    setNotes: function(notes){
        this.setState({
            notes: notes
        });
        api.setNotes(this.state.ticketId, notes);
    },

    setAssignee: function(assignee){
        this.setState({
            assignee: assignee
        });
        api.setAssignee(this.state.ticketId, assignee.resource_uri);
    },

    setDueDate: function(chat_due_date){
        this.setState({
            dueDate: chat_due_date
        });
        api.setDueDate(this.state.ticketId, chat_due_date);
    },

    setClosedDate: function(chat_closed_date){
        this.setState({
            dateClosed: chat_closed_date
        });
        api.setClosedDate(this.props.chatId, chat_closed_date);
    },

    render: function() {
        return (
            <div className="col-xs-12 col-sm-9">
                <DateCreated date={this.state.dateCreated}/>
                <DateClosed date={this.state.dateClosed} setClosedDate={this.setClosedDate}/>
                <Priority priorityList={this.state.priorityList} priority={this.state.priority} setPriority={this.setPriority} chatId={this.props.chatId}/>
                <DueDate dueDate={this.state.dueDate} setDueDate={this.setDueDate} />
                <Assignee assignee={this.state.assignee} setAssignee={this.setAssignee} users={this.state.userList} />
                <Cost cost={this.state.cost} setCost={this.setCost}/>
                <Tags allTags={this.state.allTags} chatTagList={this.state.chatTagList} setChatTagList={this.setChatTagList} chatId={this.props.chatId}/>
                <Notes notes={this.state.notes} setNotes={this.setNotes}/>
            </div>
        )
    }
});
module.exports = Metadata;