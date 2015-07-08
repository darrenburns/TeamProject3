'use strict';
var React = require('react');
var api = require('./api');
var GLOBALS = require('./globals');
var Graph = require('./Graph.react');

var ProjectList = React.createClass({

    getInitialState: function () {
        return {
            projectList: [],
            //searchString: ''
            chatList: []
        }
    },

    //setSearchString: function(str) {
    //  this.setState({searchString: str});
    //},

    setProjectList: function(result){
        this.setState({
            projectList: result
        })
    },

    setChatList: function(result){
        this.setState({
            chatList: result
        })
    },

    componentWillMount: function(){
        api.getAllProjects(this.setProjectList);
        api.getAllTickets2(this.setChatList);
    },

    render: function(){

        var projectList = this.state.projectList;
        //var searchString = this.state.searchString;
        //var filteredProjects = [];
        //projectList.forEach((conversation, idx) => {
        //    if(conversation.name.toLowerCase().indexOf(searchString) > -1 || searchString === ''){
        //        filteredProjects.push(<li role="presentation">
        //            <a role="menuitem" tabindex="-1" href="#" id={conversation.id}>
        //                {conversation.name}</a>
        //        </li>);
        //    }
        //});
        var chatList = this.state.chatList;

        return (
            <div className="row">{
                projectList.map(function(project){

                    project.firstChat = "";

                    for (var i = 0; i < chatList.length; i++) {
                        var chat = chatList[i];

                        if(chat.project == (GLOBALS.API_BASE_URL + "project/" + project.id + "/")){
                            project.firstChat = chat;
                            break;
                        }
                    }

                    return (
                        <div className="col-md-3 col-sm-6">
                            <div className="panel panel-default panel-information">
                                <div className="panel-heading">
                                    <a href={
                                        (project.firstChat ?
                                        '/chats/' + project.firstChat.id :
                                        '/projects/' + project.id + '/newchat/')
                                    }><strong>{project.name}</strong></a>
                                    <a href={'/projects/' + project.id + '/info/'} className="btn-info-project">
                                        <span className="fa fa-info-circle fa-1"></span>
                                    </a>
                                </div>
                                <div className="panel-body">
                                    {project.desc}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
                <div className="col-md-3 col-sm-6">
                    <div className="panel panel-default panel-information">
                        <div className="panel-heading">
                            <a id="panel-new-project"><strong>Create new project</strong></a>
                        </div>
                        <div className="panel-body">
                            <a href="/newproject/" ><span className="fa fa-plus-square"></span> New project</a>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

});

var mountPoint = document.getElementById("mount-home-projects");
if(mountPoint != null) {
    React.render(<ProjectList />, mountPoint);
}
module.exports = ProjectList;