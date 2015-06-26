/**
 * Created by LeoLinhares on 23/06/2015.
 */

var React = require('react');
var $ = require('jquery');

var Cost = React.createClass({

    render: function() {
        var cost = this.props.cost;
        if(cost == null){
            cost = 0;
        }
        return (
            <div className="col-xs-4">
                <div className="panel panel-default panel-information">
                    <div className="panel-heading"><strong>Cost</strong></div>
                    <div className="panel-body">
                        <div className="input-group">
                            <input type="text" className="form-control" value={cost} disabled="true"/>
                              <span className="input-group-btn">
                                <button className="btn btn-default" type="button">Edit</button>
                              </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
module.exports = Cost;