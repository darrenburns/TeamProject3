/**
 * Created by LeoLinhares on 23/06/2015.
 */
const React = require('react');
const DropdownButton = require('react-bootstrap/lib/DropdownButton');
const MenuItem = require('react-bootstrap/lib/MenuItem');

const Assignee = React.createClass({

    getInitialState: function() {
        return{
            currentAssignee: this.props.assignee.name
        }
    },

    componentWillRecieveProps(nextProps){
        this.setState({
            currentAssignee: nextProps.assignee
        })

    },
    changeAssignee(event,newAssignee){
        this.setState({
            currentAssignee: newAssignee
        });
        this.props.setAssignee(newAssignee)


    },

    render: function() {

        var menuItems = this.props.users.map(assignee => {
            return <MenuItem eventKey={assignee.username}>{assignee.username}</MenuItem>;
        });
        return(
            <div className="col-xs-4">
                <div className="panel panel-default panel-information">
                    <div className="panel-heading">
                        <strong>Assignee</strong>
                    </div>
                    <div className="panel-body">
                        <DropdownButton title={this.state.currentAssignee} onSelect={this.changeAssignee}>
                            {menuItems}
                        </DropdownButton>
                    </div>
                </div>
            </div>
            )
        }





});
module.exports = Assignee;