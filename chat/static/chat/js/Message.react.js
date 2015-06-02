var React = require('react'),
    Showdown = require('showdown'),
    moment = require('moment');

var Message = React.createClass({

    getInitialState: function() {
        return {
            converter: new Showdown.Converter(),
            isStarred: false  // todo: the saved messages should be stored on firebase
        }
    },

    /* Custom */
    handleStarClick: function(event) {
        this.setState({
            isStarred: !this.state.isStarred
        });
        // todo: star the message in firebase (add an extra field to messages: isStarred)
    },

    render: function() {
        var text = this.state.converter.makeHtml(this.props.text);
        var formattedTime = moment(this.props.dt).calendar();
        var user = this.props.user;
        return (
            <div className="message">
                <div className="row">
                    <div className="col-md-9">
                        <strong>{user}</strong> <em className="date">{formattedTime}</em>
                    </div>
                    <div className="col-md-3">
                        <span className="fa fa-star pull-right hover-for-pointer"
                              style={{color: this.state.isStarred ? "" : "#cfcfcf"}}
                              onClick={this.handleStarClick}>
                        </span>
                    </div>
                </div>
                <p dangerouslySetInnerHTML={{__html: text}}
                   className="message-text"></p>
            </div>
        )
    }

});

module.exports = Message;