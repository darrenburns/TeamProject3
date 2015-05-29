var React = require('react');

module.exports = ConversationFilter = React.createClass({

    getInitialState: function() {
        return {
            searchTerm: ''
        }
    },

    handleChange: function(event) {
        var searchString = event.target.value;
        this.setState({
            searchTerm: searchString
        });
        this.props.filterMessages(searchString);
    },

    render: function() {
        var searchTerm = this.state.searchTerm;
        return (
            <input className="form-control"
                   type="text"
                   placeholder="Search messages in thread"
                   value={searchTerm}
                   onChange={this.handleChange}/>
        )
    }

});