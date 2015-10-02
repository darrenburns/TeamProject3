/**
 * Created by LeoLinhares on 23/06/2015.
 */
var React = require('react');
var $ = require('jquery');
require('bootstrap-select');

var Assignee = React.createClass({

    componentDidMount: function(){

        var setAssigneeFunction = this.props.setAssignee;

        $( document ).ready(function() { //After document has been parsed

            var userListElement = $('#metadata-assignee'); //Get the userListElement

            userListElement.on('change', function(){ //Update parent's state when a new user is selected
                var selectedUser = userListElement.find('option:selected').data('item');
                setAssigneeFunction(selectedUser);
            });

        });
    },

    componentDidUpdate: function(prevProps, prevState){
        $( document ).ready(function() { //After document has been parsed
            var userListElement = $('#metadata-assignee'); //Get the userListElement
            userListElement.selectpicker('refresh'); //Refresh after new properties arrived
        });
    },

    render: function() {

        var users = this.props.users;
        var assignee = this.props.assignee;

        return (
            <div className="col-xs-6">
                <div className="panel panel-default panel-information">
                    <div className="panel-heading"><strong>Assignee</strong></div>
                    <div className="panel-body">
                        <select id="metadata-assignee" value={assignee.id} className="selectpicker" data-width="90%">
                            {
                                users.map(function(userObj){
                                    return (<option data-item={JSON.stringify(userObj)} value={userObj.id} key={userObj.id}>{userObj.username}</option>)
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
        )
    }
});
module.exports = Assignee;