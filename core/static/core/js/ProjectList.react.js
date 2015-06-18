'use strict';
var React = require('react');
var api = require('./api');

var ProjectList = React.createClass({

    getInitialState: function () {
        return {
            projectList: []
        }
    },

    setProjectList: function(result){
        this.setState({
            projectList: result
        })
    },

    componentWillMount: function(){
        api.getAllProjects(this.setProjectList)
    },

    render: function(){

        var projectList = this.state.projectList;

        return (
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Projects <span className="caret"></span></a>
                    <ul className="dropdown-menu" role="menu" aria-labelledby="navbar-dropdown-list" id="navbar-dropdown-list">
                        {
                            projectList.map(function(project){
                                return (<li role="presentation"><a role="menuitem" tabindex="-1" href="#" id={project.id}>{project.name}</a></li>)
                            })
                        }
                    </ul>
                </li>
        )

    }

});

var mountPoint = document.getElementById("mount-project-list");
React.render(<ProjectList />, mountPoint);

module.exports = ProjectList;