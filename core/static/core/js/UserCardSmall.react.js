var React = require('react');

/*
 Right now a UserCardSmall component is just a panel from Bootstrap
 which displays a name.
 */
module.exports = UserCardSmall = React.createClass({

    render: function() {
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <a href={"/profiles/" + this.props.userName}>{this.props.userName}</a>
                </div>
            </div>
        )
    }

});