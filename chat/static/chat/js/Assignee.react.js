/**
 * Created by LeoLinhares on 23/06/2015.
 */
var React = require('react');
var $ = require('jquery');
require('bootstrap-select');

var Assignee = React.createClass({

    //componentWillReceiveProps: function(next){
    //},
    //
    //componentDidMount: function(){
    //
    //    var setPriorityFunction = this.props.setPriority;
    //
    //    $( document ).ready(function() { //After document has been parsed
    //
    //        var priorityListElement = $('#metadata-priority'); //Get the priorityListElement
    //
    //        setTimeout(function(){ //Update element after the priorities are retrieved
    //            priorityListElement.selectpicker('refresh');
    //        }, 1000);
    //
    //        priorityListElement.on('change', function(){ //Update parent's state when a new priority is selected
    //            var selectedPriority = priorityListElement.find('option:selected').data('item');
    //            setPriorityFunction(selectedPriority);
    //        });
    //
    //    });
    //},


    render: function() {

        return (
            <div className="col-xs-6">
                <div className="panel panel-default panel-information">
                    <div className="panel-heading"><strong>Assignee</strong></div>
                    <div className="panel-body">
                        <select id="metadata-priority" className="selectpicker" data-width="90%">
                            <option></option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }
});
module.exports = Assignee;