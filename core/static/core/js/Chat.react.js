/**
 * Created by LeoLinhares on 24/06/2015.
 */

var React = require('react');
var Label = require('./Label.react');

var Chat = React.createClass({

    render: function () {
        var conversationList = this.props.conversationList;

        return(
            <div className="list-group" id="open-tickets-list">
                {conversationList.map(function(result) {
                    if(result.closed == null){
                        return(
                            <a className="list-group-item" href={/chats/+result.id} key={result.id}>{result.title}
                                <Label labelName={result.ticket.priority ? result.ticket.priority.name : ''} labelColour={result.ticket.priority ? result.ticket.priority.colour : ''}/>
                                <Label labelName={result.ticket.tag[0] ? result.ticket.tag[0].title : ''} labelColour={result.ticket.tag[0] ? result.ticket.tag[0].colour : ''}/>
                            </a>);
                    }
                })}
            </div>
        )
    }

});

module.exports = Chat;
