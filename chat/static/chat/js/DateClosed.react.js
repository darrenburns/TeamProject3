/**
 * Created by LeoLinhares on 23/06/2015.
 */

var React = require('react');
var $ = require('jquery');
// TODO: complete closed
var DateClosed = React.createClass({

    getInitialState : function() {
        return {
            closedDate: ''
        };
    },


    handleClick: function() {
        var date = new Date();
        date = date.toISOString();
        this.setState({closedDate: date});
        this.props.setClosedDate(date);
    },

    render: function() {
        var date = this.props.date;
        if(date != null){
            return (
                <div className="col-xs-4">
                    <div className="panel panel-default panel-information">
                        <div className="panel-heading"><strong>Date Closed</strong></div>
                        <div className="panel-body">
                            {this.props.date}
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="col-xs-4">
                    <div className="panel panel-default panel-information">
                        <div className="panel-heading"><strong>Date Closed</strong></div>
                        <div className="panel-body">
                            <button className="btn btn-danger" onClick={this.handleClick}>Close Chat</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
});
module.exports = DateClosed;