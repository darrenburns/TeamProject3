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
            <div className="row">{
                projectList.map(function(project){
                    return (
                        <div className="col-xs-3">
                            <div className="panel panel-default panel-information">
                                <div className="panel-heading">
                                    <strong>{project.name}</strong>
                                    <div className="btn-info-project">
                                        i
                                    </div>
                                </div>
                                <div className="panel-body">
                                    {project.desc}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        )

    }

});

var mountPoint = document.getElementById("mount-home-projects");
React.render(<ProjectList />, mountPoint);

module.exports = ProjectList;