/**
 * Created by LeoLinhares on 23/06/2015.
 */

var React = require('react');
var $ = require('jquery');
var DatePicker = require('react-datepicker');
var moment = require('moment');

var DueDate = React.createClass({

    getInitialState: function() {
        var newDueDate = new Date();
        newDueDate = newDueDate.toISOString();
        return {
            dueDate: moment(newDueDate, "YYYY-MM-DD")
        };
    },

    componentWillMount: function(){
        if(this.props.dueDate){
            this.setState({
                dueDate: moment(this.props.dueDate)
            });
        }
    },

    componentWillReceiveProps: function(next){
        if(next.dueDate){
            this.setState({
                dueDate: moment(next.dueDate)
            });
        }
    },

    handleDueDateChange: function(date) {
        this.setState({
            dueDate: date
        });
        this.props.setDueDate(date.format());
    },

    render: function() {
        return (
            <div className="col-xs-3">
                <div className="panel panel-default panel-information">
                    <div className="panel-heading"><strong>Due Date</strong></div>
                    <div className="panel-body">
                        <DatePicker
                            key="example1"
                            dateFormat="DD/MM/YYYY"
                            selected={this.state.dueDate}
                            onChange={this.handleDueDateChange}
                            minDate={moment()}
                            />
                    </div>
                </div>
            </div>
        )
    }
});
module.exports = DueDate;