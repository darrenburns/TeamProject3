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

    handleReopenClick: function(){
        this.setState({closedDate: null});
        this.props.setClosedDate(null);
    },

    render: function() {
        var date = this.props.date;
        if(date != null){
            var d = new Date(date);
            var formattedDate = d.toLocaleDateString();
            return (
                <div className="col-xs-4">
                    <div className="panel panel-default panel-information">
                        <div className="panel-heading"><strong>Date Closed</strong></div>
                        <div className="panel-body">
                            {formattedDate}
                            <button className="btn btn-danger btn-sm btn-closed-chat" onClick={this.handleReopenClick} >Reopen</button>
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
                            <button className="btn btn-danger btn-sm" onClick={this.handleClick}>Close Chat</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
});
module.exports = DateClosed;