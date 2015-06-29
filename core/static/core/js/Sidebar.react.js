var React = require('react'),
    ReactFireMixin = require('reactfire'),
    Firebase = require('firebase'),
    GLOBALS = require('./globals'),
    api = require('./api'),
    Accordion = require('./Accordion.react'),
    TicketListSort = require('./TicketListSort.react');

//TODO: complete filter and sort
/*TODO: Integrate with metadata tab. (
 *     when a priority has changed, update exclamation mark
 *     When the label list has changed, update it on sidebar
 *    )
 *
 */
var Sidebar = React.createClass({

    mixins: [ReactFireMixin],


    sortByTitleAsc: function (a, b) {
        var keyA = a.title.toLowerCase(),
            keyB = b.title.toLowerCase();
        return keyB < keyA;
    },

    sortByTitleDesc: function (a, b) {
        var keyA = a.title.toLowerCase(),
            keyB = b.title.toLowerCase();
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

    //Temporary solution to sort priority

    sortByPriorityAsc: function (a, b) {

        var defaultPriorityNumber = 5;

        var keyA = a.ticket.priority,
            keyB = b.ticket.priority;

        if(keyA) { keyA = keyA.id } else { keyA = defaultPriorityNumber }
        if(keyB) { keyB = keyB.id } else { keyB = defaultPriorityNumber }

        return keyB > keyA;
    },

    sortByPriorityDesc: function (a, b) {

        var defaultPriorityNumber = 5;

        var keyA = a.ticket.priority,
            keyB = b.ticket.priority;

        if(keyA) { keyA = keyA.id } else { keyA = defaultPriorityNumber }
        if(keyB) { keyB = keyB.id } else { keyB = defaultPriorityNumber }

        return keyB < keyA;
    },


    getInitialState: function() {
        return {
            conversations: [],
            sortingOptions: [
                {
                    name:"Date Created (Asc)",
                    sortFunction: this.sortByDateCreatedAsc
                },
                {
                    name:"Date Created (Desc)",
                    sortFunction: this.sortByDateCreatedDesc
                },
                {
                    name:"Title (Asc)",
                    sortFunction: this.sortByTitleAsc
                },
                {
                    name:"Title (Desc)",
                    sortFunction: this.sortByTitleDesc
                },
                {
                    name:"Due Date (Asc)",
                    sortFunction: this.sortByDueDateAsc
                },
                {
                    name:"Due Date (Desc)",
                    sortFunction: this.sortByDueDateDesc
                },
                {
                    name:"Priority (Asc)",
                    sortFunction: this.sortByPriorityAsc
                },
                {
                    name:"Priority (Desc)",
                    sortFunction: this.sortByPriorityDesc
                }
            ],
            activeSortingOptionIndex: 0,
            currentSearch: '',
            activeIndex: null
        }
    },

    setActiveSortingOptionIndex: function(index){
        this.setState({
            activeSortingOptionIndex: index
        })
    },

    setConversations: function(resultObj){
        this.setState({
            conversations: resultObj
        })
    },

    handleSearch: function(event) {
        var newSearchValue = event.target.value;
        this.setState({currentSearch: newSearchValue});
    },

    componentWillMount: function() {
        api.getAllTickets(1, this.setConversations);
    },

    render: function() {

        var list = this.state.conversations;

        return (
            <div>
                <div className="row">
                    <div className="col-sm-9">
                        <input className="form-control"
                               type="text" value={this.state.currentSearch} onChange={this.handleSearch} placeholder="Filter Conversations" />
                    </div>
                    <div className="col-sm-3">
                        <TicketListSort
                            activeSortingOptionIndex={this.state.activeSortingOptionIndex}
                            sortingOptions={this.state.sortingOptions}
                            setActive={this.setActiveSortingOptionIndex} />
                    </div>
                </div>
                <Accordion
                    projectId={this.props.projectId}
                    chatId={this.props.chatId}
                    conversationList={list}
                    searchString={this.state.currentSearch}
                    sortingOptions={this.state.sortingOptions}
                    activeSortingOptionIndex={this.state.activeSortingOptionIndex}
                    />
            </div>
        )
    }

});

var mountPoint = document.getElementById('sidebar');
if (mountPoint !== null) {
    var currentChatId = CHAT_ID || -1;
    var currentProjectId = PROJECT_ID || -1;
    var currentUser = CURRENT_USER || '<< Anonymous User >>';
    React.render(<Sidebar chatId={currentChatId} projectId={currentProjectId}/>, mountPoint);
}
