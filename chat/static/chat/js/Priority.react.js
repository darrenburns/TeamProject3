/*
 *Created by Darren Burns
 */

const React = require('react');
const DropdownButton = require('react-bootstrap/lib/DropdownButton');
const MenuItem = require('react-bootstrap/lib/MenuItem');

const Priority = React.createClass({

    getInitialState: function() {
        return {
            currentPriority: this.props.priority.name
        }
    },

    componentWillReceiveProps(nextProps) {
        var priorityName = '';
        switch (nextProps.priority) {
            case 1: priorityName = 'High'; break;
            case 2: priorityName = 'Normal'; break;
            case 3: priorityName = 'Low'; break;
            default: priorityName = nextProps.priority.name;
        }
        this.setState({
            currentPriority: priorityName
        });
    },

    changePriority(event, newPriority) {
        this.setState({
            currentPriority: newPriority
        });
        this.props.setPriority(newPriority)
    },

    render: function() {


        var menuItems = this.props.priorityList.map(priority => {
                return <MenuItem eventKey={priority.id}>{priority.name}</MenuItem>;
            });
        return (
            <div className="col-xs-4">
                <div className="panel panel-default panel-information">
                    <div className="panel-heading">
                        <strong>Priority</strong>
                    </div>
                    <div className="panel-body">
                        <DropdownButton title={this.state.currentPriority} onSelect={this.changePriority}>
                            {menuItems}
                        </DropdownButton>
                    </div>
                </div>
            </div>
        )
}

});
module.exports = Priority;