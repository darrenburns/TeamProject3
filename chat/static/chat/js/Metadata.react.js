var React = require('react');
var DateCreated = require('./DateCreated.react');
var DateClosed = require('./DateClosed.react');
var Cost = require('./Cost.react');
var DueDate = require('./DueDate.react');
var Notes = require('./Notes.react');
var Tags = require('./Tags.react');
var Priority = require('./Priority.react');
var Assignee = require('./Assignee.react');
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
            notes: ''
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
            ticketId: chat.ticket.id,
            dateCreated: chat.created,
            dateClosed: chat.closed,
            notes: chat.ticket.notes,
            dueDate: chat.ticket.due_date
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
        api.setChatTagList(this.state.ticketId, chat_tag_list);
    },

    setCost: function(chat_cost){
        this.setState({
            cost: chat_cost
        });
    },

    setNote: function(notes){
        this.setState({
            notes: notes
        });
    },



    setDueDate: function(chat_due_date){
        this.setState({
            dueDate: chat_due_date
        });

        api.setDueDate(this.state.ticketId, chat_due_date);
    },

    render: function() {
        return (
            <div className="row">
                <div className="col-xs-9">
                    <DateCreated date={this.state.dateCreated}/>
                    <DateClosed date={this.state.dateClosed}/>
                    <Priority priorityList={this.state.priorityList} priority={this.state.priority} setPriority={this.setPriority} chatId={this.props.chatId}/>
                    <DueDate dueDate={this.state.dueDate} setDueDate={this.setDueDate} />
                    <Assignee/>
                    <Cost cost={this.state.cost} setCost={this.setCost}/>
                    <Tags allTags={this.state.allTags} chatTagList={this.state.chatTagList} setChatTagList={this.setChatTagList} chatId={this.props.chatId}/>
                    <Notes notes={this.state.notes} setNote={this.setNote}/>
                </div>
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