var React = require('react');
var $ = require('jquery');
var DatePicker = require('react-datepicker');
var moment = require('moment');

//TODO: Fix issue with different time zones

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
        this.props.setDueDate(date.format('YYYY-MM-DD'));
    },

    render: function() {
        return (
            <div className="col-xs-6">
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
moment.locale('en-gb');
module.exports = DueDate;