var React = require('react'),
    Showdown = require('showdown');

var SavedMessages = React.createClass({

    converter: new Showdown.Converter(),

    render: function(){

        var savedMessagesArray = this.props.savedMessages;
        var savedMessageElement = [];
        savedMessagesArray.forEach((messageObj, index) => {

            var messageDate = new Date(messageObj.dt).toLocaleDateString();
            var formattedMessage = this.converter.makeHtml(messageObj.desc);

            savedMessageElement.push(
                <li key={index} className="list-group-item saved-message-item">
                    <span><strong>{messageObj.user}</strong> {messageDate}</span>
                    <p dangerouslySetInnerHTML={{__html: formattedMessage}}></p>
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