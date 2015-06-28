/**
 * Created by LeoLinhares on 23/06/2015.
 */

var React = require('react');
var $ = require('jquery');
//TODO: complete notes
var Notes = React.createClass({

    render: function() {
        var notes = this.props.notes;

        return (
            <div className="col-xs-12">
                <div className="panel panel-default panel-information">
                    <div className="panel-heading"><strong>Notes</strong></div>
                    <div className="panel-body">
                        <div className="form-group">
                            <textarea className="form-control" rows="5" id="comment" value={notes} disabled="true"></textarea>
                            <button className="btn btn-default" type="button">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
module.exports = Notes;