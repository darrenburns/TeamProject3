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

    /* Custom */
    handleClick: function(event) {
        this.setState({isSelected: !this.state.isSelected});
        this.props.toggleUser(this.props.userName);
    },

    render: function() {
        return (
            <div className="user-card user-card-small"
                 onClick={this.handleClick}>
                <div className="row">
                    <div className="col-md-10">
                        <a href={"/profiles/" + this.props.userName}>{this.props.userName}</a>
                    </div>
                    <div className="col-md-2">
                        <span className="fa fa-filter"
                              style={{color: this.state.isSelected ? "" : "#cfcfcf"}}></span>
                    </div>

                </div>

            </div>
        )
    }

});

module.exports = UserCardSmall;