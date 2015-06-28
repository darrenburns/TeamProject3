/**
 * Created by LeoLinhares on 17/06/2015.
 */
var React = require('react');
var Chat = require('./Chat.react');
var ClosedChat = require('./ClosedChat.react');

//TODO: label active
//TODO: Solve problem with priorities ordering. Add weight to priorities table in DB
//TODO: Solve problem with null priorities. Add least important as default

var Accordion = React.createClass({

    sortByTitleAsc: function (a, b) {
        var keyA = new String(a.title),
            keyB = new String(b.title);
        return keyB < keyA;
    },

    sortByTitleDesc: function (a, b) {
        var keyA = new String(a.title),
            keyB = new String(b.title);
        return keyB > keyA;
    },

    //By default null dates stay at the end

    sortByDateCreatedAsc: function (a, b) {
        var x = Date.parse(a.created);
        var y = Date.parse(b.created);
        if (x == y) { return 0; }
        if (isNaN(y) || x < y) { return -1; }
        if (isNaN(x) || x > y) { return 1; }
    },

    sortByDateCreatedDesc: function (a, b) {
        var x = Date.parse(a.created);
        var y = Date.parse(b.created);
        if (x == y) { return 0; }
        if (isNaN(x) || x < y) { return 1; }
        if (isNaN(y) || x > y) { return -1; }
    },

    sortByDueDateAsc: function (a, b) {
        var x = Date.parse(a.ticket.due_date);
        var y = Date.parse(b.ticket.due_date);
        if (x == y) { return 0; }
        if (isNaN(y) || x < y) { return -1; }
        if (isNaN(x) || x > y) { return 1; }
    },

    sortByDueDateDesc: function (a, b) {
        var x = Date.parse(a.ticket.due_date);
        var y = Date.parse(b.ticket.due_date);
        if (x == y) { return 0; }
        if (isNaN(x) || x < y) { return 1; }
        if (isNaN(y) || x > y) { return -1; }
    },

    sortByPriorityAsc: function (a, b) {
        var keyA = a.ticket.priority,
            keyB = b.ticket.priority;

        if(keyA) { keyA = keyA.id } else { keyA = 0 }
        if(keyB) { keyB = keyB.id } else { keyB = 0 }

        return keyB > keyA;
    },

    sortByPriorityDesc: function (a, b) {
        var keyA = a.ticket.priority,
            keyB = b.ticket.priority;

        if(keyA) { keyA = keyA.id } else { keyA = 0 }
        if(keyB) { keyB = keyB.id } else { keyB = 0 }

        return keyB < keyA;
    },


    render: function() {

        var conversationList = this.props.conversationList;
        var searchString = this.props.searchString.toLowerCase();
        var openTicketList = [],
            closedTicketList = [];

        conversationList.forEach((chatObj, index) => {
            if(searchString === '' || chatObj.title.toLowerCase().indexOf(searchString) > -1){
                if(!chatObj.closed){
                    openTicketList.push(chatObj);
                } else {
                    closedTicketList.push(chatObj);
                }
            }
        });


        return (
            <div className="panel-group" id="tickets-panel" role="tablist" aria-multiselectable="true">
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="heading-open">
                        <h4 className="panel-title">
                            <a data-toggle="collapse" data-parent="#tickets-panel" href="#collapse-open" aria-expanded="false" aria-controls="collapse-open">
                                Conversations    <span className="badge" id="number-of-conversations"></span>
                            </a>
                            <a href={"/projects/"+this.props.projectId+"/newchat/"} id="group-sort-new">
                                <button type="button" className="btn btn-default btn-xs pull-right" data-toggle="tooltip" data-placement="right" title="New Conversation" id="new-project-button">
                                    <i className="fa fa-plus"></i> New
                                </button>
                            </a>
                        </h4>
                    </div>
                    <div id="collapse-open" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading-open">
                        <Chat activeChatId={this.props.chatId} conversationList={openTicketList}/>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="heading-closed">
                        <h4 className="panel-title">
                            <a data-toggle="collapse" data-parent="#tickets-panel" href="#collapse-closed" aria-expanded="false" aria-controls="collapse-closed">
                                Closed conversations    <span className="badge" id="number-of-closed-conversations"></span>
                            </a>
                        </h4>
                    </div>
                    <div id="collapse-closed" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading-closed">
                        <div className="list-group" id="closed-tickets-list">
                            <ClosedChat conversationList={closedTicketList}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

});



module.exports = Accordion;