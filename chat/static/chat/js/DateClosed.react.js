/**
 * Created by LeoLinhares on 23/06/2015.
 */

var React = require('react');
var $ = require('jquery');

var DateClosed = React.createClass({

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
                            <button className="btn btn-danger">Close Chat</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
});
module.exports = DateClosed;