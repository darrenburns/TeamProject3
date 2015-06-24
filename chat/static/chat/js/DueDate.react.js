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

    handleStartDateChange: function(date) {
        this.setState({
            dueDate: date
        });
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
                            onChange={this.handleStartDateChange}
                            minDate={moment()}
                            />
                        <button className="btn btn-default pull-right">Edit</button>
                    </div>
                </div>
            </div>
        )
    }
});
module.exports = DueDate;