var React = require('react'),
    ReactFireMixin = require('reactfire'),
    Firebase = require('firebase'),
    GLOBALS = require('./globals'),
    api = require('./api'),
    Accordion = require('./Accordion.react');

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
                <input className="form-control"
                       type="text" value={this.state.currentSearch} onChange={this.handleSearch} placeholder="Filter Tickets" />
                <Accordion conversationList={list} />
            </div>

        )
    }

});

var mountPoint = document.getElementById('sidebar');
if(mountPoint != null){
    React.render(
        <Sidebar />,
        mountPoint
    );
}
