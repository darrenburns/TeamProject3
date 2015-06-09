var React = require('react');

var Sidebar = react.createClass({

    getInitialState: function() {
        return {
            conversations: [],
            currentSearch: '',
            activeIndex: null
        }
    },

    render: function() {
        return (
           <h5>Conversations</h5>
           <input value={this.state.currentSearch} onChange={this.handleSearch} placeholder="Filter Tickets" />
        )
    }

});

module.exports = Sidebar;