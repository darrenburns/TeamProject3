var React = require('react'),
    UserCardSmall = require('../../../../core/static/core/js/UserCardSmall.react');

var ConversationParticipantsList = React.createClass({

    render: function() {
        var participantObjects = this.props.users;
        var userCards = [];
        var participants = participantObjects;
        participants.forEach((user, idx) => {
             userCards.push(<UserCardSmall key={idx}
                                           userName={user}
                                           toggleUser={this.props.toggleUser.bind(null, user)} />);
        });
        return (
            <div id="participants-list">
                {userCards}
            </div>
        )
    }

});

module.exports = ConversationParticipantsList;