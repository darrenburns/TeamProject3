var React = require('react');
    //Api = require('./api');

var Sidebar = React.createClass({

    getInitialState: function() {
        return {
            conversations: [],
            currentSearch: '',
            activeIndex: null
        }
    },

    handleSearch: function(event) {
        var newSearchValue = event.target.value;
        this.setState({currentSearch: newSearchValue});
    },

    componentWillMount: function() {
        // TODO: call api here an set the state of the conversation
    },

    render: function() {
        return (
           <div>
               <h5>Conversations</h5>
               <input className="form-control"
                      type="text" value={this.state.currentSearch} onChange={this.handleSearch} placeholder="Filter Tickets" />

           </div>
        )
    }

});

var mountPoint = document.getElementById('react-sidebar');
React.render(
    <Sidebar />,
    mountPoint
);