var React = require('react');
var ProjectItem = require('./projectItem.react');

var Project = React.createClass({


    render: function(){
        var rows = [];
        this.props.projects.forEach(function(project) {
            rows.push(<ProjectItem project={project} key={project.name} />);
        });
        return (<ul className="dropdown-menu">{rows}</ul>)
    }

});

var PROJECTS = [
  {name: 'Football'},
  {name: 'Baseball'},
  {name: 'Basketball'},
  {name: 'iPod Touch'},
  {name: 'iPhone 5'},
  {name: 'Nexus 7'}
];

var mountPoint = document.getElementById("navbar-dropdown-list");
React.render(<Project projects={PROJECTS} />, mountPoint);