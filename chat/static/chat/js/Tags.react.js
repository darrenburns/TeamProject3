/**
 * Created by LeoLinhares on 23/06/2015.
 */

var React = require('react');
var $ = require('jquery');

var Tags = React.createClass({

    render: function() {
        var result = this.props.allTags;

        return (
            <div className="col-xs-4">
                <div className="panel panel-default panel-information">
                    <div className="panel-heading"><strong>Tags</strong></div>
                    <div className="panel-body">
                        {
                            result.map(function(result) {
                                    return <div className="checkbox" key={result.id}>
                                        <label>
                                            <input type="checkbox"/>{result.title}
                                        </label>
                                    </div>;
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
});
module.exports = Tags;
