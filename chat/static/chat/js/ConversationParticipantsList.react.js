var React = require('react'),
    UserCardSmall = require('../../../../core/static/core/js/UserCardSmall.react');

module.exports = ConversationParticipantsList = React.createClass({

    render: function() {
        var participants = this.props.users;
        var userCards = [];
        participants.forEach((user, idx) => {
             userCards.push(<UserCardSmall key={idx} userName={user} />);
        });
        return (
            <div>
                {userCards}
            </div>
        )
    }

});