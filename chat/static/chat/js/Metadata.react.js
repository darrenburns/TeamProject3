var React = require('react');
var DateCreated = require('./DateCreated.react');
var DateClosed = require('./DateClosed.react');
var Cost = require('./Cost.react');
var DueDate = require('./DueDate.react');
var Notes = require('./Notes.react');
var Tags = require('./Tags.react');
var Priority = require('./Priority.react');

var MetadataComponent = React.createClass({

    //getInitialState: function() {
    //    return {
    //
    //    }
    //},

    render: function() {

        return (
            <div className="row">
                <DateCreated/>
                <DateClosed/>
                <Cost/>
                <DueDate/>
                <Notes/>
                <Tags/>
                <Priority/>
            </div>
        )
    }
});

var mountPoint = document.getElementById('metadata-thread');
//if (mountPoint !== null) {
//    var currentChatId = CHAT_ID || -1;
//    var currentProjectId = PROJECT_ID || -1;
//    var currentUser = CURRENT_USER || '<< Anonymous User >>';
//    React.render(<Conversation chatId={currentChatId} projectId={currentProjectId}/>, mountPoint);
//}
module.exports = MetadataComponent;