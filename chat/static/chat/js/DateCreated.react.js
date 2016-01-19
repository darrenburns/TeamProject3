/**
 * Created by LeoLinhares on 23/06/2015.
 */

var React = require('react');
var $ = require('jquery');

var DateCreated = React.createClass({

    render: function() {
        var date = this.props.date;
        var d = new Date(date);
        var formattedDate = d.toLocaleDateString();
        return (
            <div className="col-xs-4">
                <div className="panel panel-default panel-information">
                    <div className="panel-heading"><strong>Date Created</strong></div>
                    <div className="panel-body">
                        {formattedDate}
                    </div>
                </div>
            </div>
        )
    }
});
module.exports = DateCreated;
