var React = require('react'),
    UserCardSmall = require('../../../../core/static/core/js/UserCardSmall.react');

module.exports = ConversationParticipantsList = React.createClass({

    render: function() {
        var participants = this.props.users;
        return (
            <div>
                {participants.map((user, idx) => {
                    return <UserCardSmall key={idx} userName={user} />
                })}
            </div>
        )
    }

});