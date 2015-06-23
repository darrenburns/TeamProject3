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
