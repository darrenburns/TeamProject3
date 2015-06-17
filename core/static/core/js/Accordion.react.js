/**
 * Created by LeoLinhares on 17/06/2015.
 */
var React = require('react');

var Accordion = React.createClass({

    render: function() {

        var conversationList = this.props.conversationList;

        return (
            <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="heading-open">
                    <h4 className="panel-title">
                        <a data-toggle="collapse" data-parent="#tickets-panel" href="#collapse-open" aria-expanded="false" aria-controls="collapse-open">
                            Conversations    <span className="badge" id="number-of-conversations"></span>
                        </a>
                        <br/>
                        <div className="btn-group" id="group-sort-new">

                            <button className="btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown" id="btn-sort" >
                                <span className="fa fa-sort"></span> Sort
                                <span className="caret"></span>
                            </button>

                            <a href="/projects/id/newchat/">
                                <button type="button" className="btn btn-default btn-xs pull-left" data-toggle="tooltip" data-placement="right" title="New Conversation" id="new-project-button">
                                    <i className="fa fa-plus"></i> New
                                </button>
                            </a>
                        </div>
                    </h4>
                </div>
                <div id="collapse-open" className="panel-collapse collapse" role="tabpanel" aria-labelledby="heading-open">
                    <div className="list-group" id="open-tickets-list">
                        <a className="list-group-item">Leonardo</a>
                    </div>
                </div>
            </div>
        )
    }

});



module.exports = Accordion;