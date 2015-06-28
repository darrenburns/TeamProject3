/**
 * Created by LeoLinhares on 17/06/2015.
 */
var React = require('react');
var Chat = require('./Chat.react');
var ClosedChat = require('./ClosedChat.react');

//TODO: label active

var Accordion = React.createClass({

    render: function() {

        var conversationList = this.props.conversationList;

        return (
            <div className="panel-group" id="tickets-panel" role="tablist" aria-multiselectable="true">
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="heading-open">
                        <h4 className="panel-title">
                            <a data-toggle="collapse" data-parent="#tickets-panel" href="#collapse-open" aria-expanded="false" aria-controls="collapse-open">
                                Conversations    <span className="badge" id="number-of-conversations"></span>
                            </a>
                            <a href={"/projects/"+this.props.projectId+"/newchat/"} id="group-sort-new">
                                <button type="button" className="btn btn-default btn-xs pull-right" data-toggle="tooltip" data-placement="right" title="New Conversation" id="new-project-button">
                                    <i className="fa fa-plus"></i> New
                                </button>
                            </a>
                        </h4>
                    </div>
                    <div id="collapse-open" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading-open">
                        <Chat activeChatId={this.props.chatId} conversationList={conversationList}/>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="heading-closed">
                        <h4 className="panel-title">
                            <a data-toggle="collapse" data-parent="#tickets-panel" href="#collapse-closed" aria-expanded="false" aria-controls="collapse-closed">
                                Closed conversations    <span className="badge" id="number-of-closed-conversations"></span>
                            </a>
                        </h4>
                    </div>
                    <div id="collapse-closed" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading-closed">
                        <div className="list-group" id="closed-tickets-list">
                            <ClosedChat conversationList={conversationList}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

});



module.exports = Accordion;