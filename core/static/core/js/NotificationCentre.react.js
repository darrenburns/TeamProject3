var React = require('react'),
    $ = require('jquery'),
    bootstrap = require('bootstrap'),
    ReactFireMixin = require('reactfire'),
    GLOBALS = require('./globals');
var NotificationCentre = React.createClass({

    mixins: [ReactFireMixin],

    notificationRef: '',

    getInitialState: function(){
        return {
            notifications: []
        }
    },

    componentWillMount: function() {
        var fbBaseUrl = GLOBALS.FIREBASE_BASE_URL;
        this.notificationsRef =
            new Firebase(`${fbBaseUrl}notifications/${this.props.user}`);

        this.bindAsObject(this.notificationsRef, 'notifications');
    },

    componentDidMount: function(){
    },

    render: function(){
        return (
            <li className="dropdown" id="notification-centre-mount">

                <a href="#" className="dropdown-toggle"
                   data-toggle="dropdown" role="button"
                   aria-haspopup="true" aria-expanded="false">
                    Notifications
                    <span className="caret"></span>
                </a>

                <ul className="dropdown-menu" aria-labelledby="dropdownMenuDivider">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li><a href="#">Separated link</a></li>
                </ul>

            </li>
        )

    }

});

var mountPoint = document.getElementById('notification-centre-mount');

if (mountPoint !== null) {
    var currentChatId = CHAT_ID || -1;
    var currentProjectId = PROJECT_ID || -1;
    var currentUser = CURRENT_USER || '<< Anonymous User >>';
    var currentUserId = CURRENT_USER_ID || -1;
    React.render(
        <NotificationCentre
            chatId={currentChatId}
            projectId={currentProjectId}
            user={currentUser}
            userId={currentUserId}
            />,
        mountPoint
    );
    mountPoint.appendChild()
}

module.exports=NotificationCentre;