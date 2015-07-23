/**
 * Created by LeoLinhares on 24/06/2015.
 */

var React = require('react');
var Label = require('./Label.react');
var LabelTags = require('./LabelTags.react');
var classNames = require('classnames');

//TODO: Check if it is the best way to implement shared properties

var Chat = React.createClass({

    render: function () {
        var conversationList = this.props.conversationList;
        var activeChatId = this.props.activeChatId;
        var chatSharedProperties = this.props.chatSharedProperties;

        return(
            <div className="list-group" id="open-tickets-list">
                {conversationList.map(function(result) {
                    var priority = result.ticket.priority;
                    var tag = result.ticket.tag;
                    var classes = classNames({
                        'list-group-item': true,
                        'active': activeChatId == result.id
                    });

                    if(chatSharedProperties){
                        if(chatSharedProperties.id == result.id){

                            if(chatSharedProperties.priority != null){
                                priority = chatSharedProperties.priority
                            }

                            if(chatSharedProperties.chatTagList != null ){
                                tag = chatSharedProperties.chatTagList
                            }

                        }
                    }


                    if(result.closed == null){
                        return(
                            <div key={result.id}>
                                <a className={classes} href={/chats/+result.id} key={result.id}>{result.title}
                                    <Label priority={priority}/>
                                    <LabelTags tagList={tag}/>
                                </a>
                            </div>
                        );
                    }
                })}
            </div>
        )
    }

});

module.exports = Chat;
