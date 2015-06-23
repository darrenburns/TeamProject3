/**
 * Created by LeoLinhares on 20/06/2015.
 */
var React = require('react');

var ProjectListFilter = React.createClass({

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
                   placeholder="Search conversations"
                   value={searchTerm}
                   onChange={this.handleChange}/>
        )
    }

});

module.exports = ProjectListFilter;