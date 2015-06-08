var React = require('react');

var ProjectItem = React.createClass({
    render: function() {
        return (<li>{this.props.project.name}</li>);
    }
});

module.exports = ProjectItem;