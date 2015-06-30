/**
 * Created by LeoLinhares on 24/06/2015.
 */

var React = require('react');
var Label = require('./Label.react');
var LabelTags = require('./LabelTags.react');
var classNames = require('classnames');

var ClosedChat = React.createClass({

    render: function () {
        var conversationList = this.props.conversationList;
        var activeChatId = this.props.activeChatId;
        return(
            <div className="list-group" id="open-tickets-list">
                {conversationList.map(function(result) {
                    var priority = result.ticket.priority;
                    var tag = result.ticket.tag;
                    var classes = classNames({
                        'list-group-item': true,
                        'active': activeChatId == result.id
                    });

                    if(result.closed != null){
                        return(
                            <a className={classes} href={/chats/+result.id} key={result.id}>{result.title}
                                <Label priority={priority}/>
                                <LabelTags tagList={tag}/>
                            </a>);
                    }
                })}
            </div>
        )
    }

});

module.exports = ClosedChat;
