var React = require('react');

/*
 Right now a UserCardSmall component is just a panel from Bootstrap
 which displays a name.
 */
module.exports = UserCardSmall = React.createClass({

    render: function() {
        return (
            <div className="user-card user-card-small">
                <a href={"/profiles/" + this.props.userName}>{this.props.userName}</a>
            </div>
        )
    }

});