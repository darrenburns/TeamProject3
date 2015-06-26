/**
 * Created by LeoLinhares on 23/06/2015.
 */
var React = require('react');
var $ = require('jquery');
require('bootstrap-select');

var Priority = React.createClass({

    handlePriority: function(priorityId){
    },


    componentWillReceiveProps: function(next){
    },

    componentDidMount: function(){

        var setPriorityFunction = this.props.setPriority;

        $( document ).ready(function() { //After document has been parsed

            var priorityListElement = $('#metadata-priority'); //Get the priorityListElement

            setTimeout(function(){ //Update element after the priorities are retrieved
                priorityListElement.selectpicker('refresh');
            }, 1000);

            priorityListElement.on('change', function(){ //Update parent's state when a new priority is selected
                var selectedPriority = priorityListElement.find('option:selected').data('item');
                setPriorityFunction(selectedPriority);
            });

        });
    },

    render: function() {
        var priorityList = this.props.priorityList;
        var priority = this.props.priority;
        return (
            <div className="col-xs-4">
                <div className="panel panel-default panel-information">
                    <div className="panel-heading"><strong>Priority</strong></div>
                    <div className="panel-body">
                        <select id="metadata-priority" value={priority.id} className="selectpicker" data-width="90%">
                            {
                                priorityList.map(function(item){
                                    return (<option data-item={JSON.stringify(item)} value={item.id} key={item.id}>{item.name}</option>)
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