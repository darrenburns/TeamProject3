/**
 * Created by LeoLinhares on 23/06/2015.
 */
var React = require('react');
var $ = require('jquery');
require('bootstrap-select');

var Priority = React.createClass({

    handlePriority: function(priorityId){
    },


    componentWillReceiveProps: function(before, next){
        setTimeout(function(){
            $('.selectpicker').selectpicker('refresh');
        }, 1000);
    },

    render: function() {
        var priorityList = this.props.priorityList;
        var priority = this.props.priority;
        var setPriorityFunc = this.props.setPriority;

        $( document ).ready(function() {
            $('select.selectpicker').on('change', function(){
                var selectedPriority = $('.selectpicker option:selected').val();
                priorityList.forEach(function(priority){
                    if(priority.id == selectedPriority){
                        setPriorityFunc(priority);
                    }
                });
            });

        });

        return (
            <div className="col-xs-3">
                <div className="panel panel-default panel-information">
                    <div className="panel-heading"><strong>Priority</strong></div>
                    <div className="panel-body">
                        <select value={priority.id} className="selectpicker" data-width="90%">
                            {
                                priorityList.map(function(item){
                                    return (<option value={item.id} key={item.id}>{item.name}</option>)
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