/**
 * Created by LeoLinhares on 23/06/2015.
 */
var React = require('react');

var Priority = React.createClass({
    render: function() {
        var priorityList = this.props.priorityList;

        return (
            <div className="col-xs-3">
                <div className="panel panel-default panel-information">
                    <div className="panel-heading"><strong>Priority</strong></div>
                    <div className="panel-body">
                        <select className="selectpicker" data-width="90%">
                            {
                                priorityList.map(function(item){
                                    return (<option>{item.name}</option>)
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Priority;