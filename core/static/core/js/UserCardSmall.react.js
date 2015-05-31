var React = require('react');

/*
 Right now a UserCardSmall component is just a panel from Bootstrap
 which displays a name.
 */
var UserCardSmall = React.createClass({

    getInitialState: function() {
        return {
            isSelected: false
        }
    },

    render: function() {
        return (
            <div className="user-card user-card-small" onClick={this.props.toggleUser.bind(null, this.props.userName)}>
                <a href={"/profiles/" + this.props.userName}>{this.props.userName}</a>
            </div>
        )
    }

});

module.exports = UserCardSmall;