var React = require('react');

var SavedMessages = React.createClass({

    render: function(){
        return(
            <div className="col-xs-12 col-sm-3">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        Saved messages
                    </div>
                    <div className="panel-body">
                        <ul className="list-group" id="saved-messages">

                        </ul>
                    </div>
                </div>
            </div>
        )
    }

});

module.exports=SavedMessages;