var React = require('react');

var SavedMessages = React.createClass({

    render: function(){

        var savedMessagesArray = this.props.savedMessages;
        var savedMessageElement = [];
        savedMessagesArray.forEach((messageObj, index) => {

            var messageDate = new Date(messageObj.dt).toLocaleDateString();

            savedMessageElement.push(
                <li key={index} className="list-group-item saved-message-item">
                    <span><strong>{messageObj.user}</strong> {messageDate}</span>
                    <p>{messageObj.desc}</p>
                </li>
            )
        })


        return(
            <div className="col-xs-12 col-sm-3">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        Saved messages
                    </div>
                    <div className="panel-body">
                        <ul className="list-group" id="saved-messages">
                            {savedMessageElement}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

});

module.exports=SavedMessages;