var React = require('react'),
    ReactFireMixin = require('reactfire'),
    Firebase = require('firebase'),
    GLOBALS = require('./globals'),
    api = require('./api'),
    Accordion = require('./Accordion.react');

//TODO: complete filter and sort
/*TODO: Integrate with metadata tab. (
 *     when a priority has changed, update exclamation mark
 *     When the label list has changed, update it on sidebar
 *    )
 *
 */
var Sidebar = React.createClass({

    mixins: [ReactFireMixin],

    getInitialState: function() {
        return {
            conversations: [],
            currentSearch: '',
            activeIndex: null
        }
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
                        <button className="btn btn-default btn-xs dropdown-toggle pull-right" type="button" data-toggle="dropdown" id="btn-sort" >
                            <span className="fa fa-sort"></span> Sort
                            <span className="caret"></span>
                        </button>
                    </div>
                </div>
                <Accordion projectId={this.props.projectId} chatId={this.props.chatId} conversationList={list} />
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
