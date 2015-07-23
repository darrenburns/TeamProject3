var React = require('react'),
    $ = require('jquery'),
    bootstrap = require('bootstrap'),
    ReactFireMixin = require('reactfire'),
    GLOBALS = require('./globals');
var NotificationCentre = React.createClass({

    mixins: [ReactFireMixin],

    notificationsRef: '',

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

    updateRead: function(event){
        var key = event.target.dataset.key;
        this.notificationsRef.child(key).child("read").set(true);
    },

    render: function(){

        var listOfNotifications = [];
        var notifications = this.state.notifications;
        var myFunction = this.updateRead;

        if(notifications){

            var keyArray = Object.keys(notifications);
            var valueArray = Object.keys(notifications).map(function(k) { return notifications[k] });

            valueArray.forEach(function(notificationObj, index){
                if(!notificationObj.read){
                    var objKey = keyArray[index];
                    listOfNotifications.push(
                        <li key={index}>
                            <a href={`/chats/${notificationObj.chatId}`}>
                                <input type="checkbox" data-key={objKey} onClick={myFunction} /> <b>{notificationObj.title}</b>
                                <br />
                                {notificationObj.message}
                                <br />
                                Author: {notificationObj.author}
                            </a>
                        </li>
                    )
                }
            });
        }


        return (
            <li className="dropdown" id="notification-centre-mount">

                <a href="#" className="dropdown-toggle"
                   data-toggle="dropdown" role="button"
                   aria-haspopup="true" aria-expanded="false">
                    Notifications
                    <span className="caret"></span>
                </a>

                <ul className="dropdown-menu" aria-labelledby="dropdownMenuDivider">
                    { listOfNotifications }
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
}

module.exports=NotificationCentre;