var React = require('react'),
    ReactFireMixin = require('reactfire'),
    Firebase = require('firebase'),
    GLOBALS = require('./globals'),
    api = require('./api');

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

        var list = [];
        this.state.conversations.forEach((obj) => {
            list.push(<li>{obj.title}</li>);
        });


        return (
            <div>
                <h5>Conversations</h5>
                <input className="form-control"
                       type="text" value={this.state.currentSearch} onChange={this.handleSearch} placeholder="Filter Tickets" />
                <div><ul>{list}</ul></div>
            </div>
        )
    }

});

var mountPoint = document.getElementById('react-sidebar');
React.render(
    <Sidebar />,
    mountPoint
);