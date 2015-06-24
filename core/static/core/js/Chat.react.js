/**
 * Created by LeoLinhares on 24/06/2015.
 */

var React = require('react');
var Label = require('./Label.react');
var LabelTags = require('./LabelTags.react');

var Chat = React.createClass({

    render: function () {
        var conversationList = this.props.conversationList;
    //quando for null
        return(
            <div className="list-group" id="open-tickets-list">
                {conversationList.map(function(result) {
                    var priority = result.ticket.priority;
                    var tag = result.ticket.tag;

                    if(result.closed == null){
                        return(
                            <a className="list-group-item" href={/chats/+result.id} key={result.id}>{result.title}
                                <Label priority={priority}/>
                                <LabelTags tagList={tag}/>
                            </a>);
                    }
                })}
            </div>
        )
    }

});

module.exports = Chat;
