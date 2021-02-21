import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingSmall from './LoadingSmall';
import firebase from '../../firebase';
import { setNotificationChannel, clearNotificationForCurrent, 
  setPrivateChannel } from '../../actions/channels';
import { setColor, setActiveUsers } from '../../actions/user';
import { connect } from 'react-redux';
import Spinner from './Spinner';

const DirectMessages = ({
  user, 
  setPrivateChannel, 
  setColor, 
  colors,
  active,
  setNotificationChannel,
  setActiveUsers,
  clearNotificationForCurrent, 
  channels: {
    loading, 
    notifyChannels, 
    currentChannel
  }}) => {
  
  const [users, setUsers] = useState([]);
  // const [activeUsers, setActiveUsers] = useState([]);
  const [presenceRef, setPresenceRef] = useState(firebase.database().ref('presence'));

  useEffect(() => {
    if(user){
      loadUsers(user.uid);
    }
  }, [user]);

  useEffect(() => {
    checkNotifications();
  }, []);

  const checkNotifications = () => {
    firebase.database().ref('privatemessages').on('child_changed', snap => {
      setNotificationChannel(snap.key);
    });
  }

  const loadUsers = uid => {
    let loadedUsers = [];
    firebase.database().ref('users').on('child_added', snap => {      
      if(uid !== snap.key){
        let user = snap.val();
        user['uid'] = snap.key;        
        loadedUsers.push(user);
        setUsers(loadedUsers);
      }else{
        let user = snap.val();
        setColor(user.colors);
      }
    });

    firebase.database().ref('.info/connected').on('value', snap => {
      if(snap.val() === true){
        const ref = presenceRef.child(uid);
        ref.set(true);

        ref.onDisconnect().remove(err => {
          if(err !== null){
            console.error(err);
          }
        });
      }      
    });

    
    presenceRef.on('value', snap => {
      if(uid != snap.key){  
        let activeUser = [];
        for(let i in snap.val()){
          if(!activeUser.includes(snap.key)){
            activeUser.push(i)
          }
        }
        
        setActiveUsers(activeUser);
      }      
    });

    // presenceRef.on('child_removed', snap => {
    //   if(uid != snap.key){        
    //     setActiveUsers(activeUser.map(userId => snap.key !== userId));
    //   }
    // });
  }

  const setChannel = userObj => {
    let chId = userObj.uid < user.uid? user.uid+userObj.uid: userObj.uid+user.uid;
    setPrivateChannel({
      name: userObj.name.toUpperCase(),
      id: chId,
      isPrivateChannel: true
    });
    clearNotificationForCurrent(chId);
  }

  return (
    loading? <Spinner /> :
    <Fragment>
      <li>
        <a style={{color: (colors && colors.Links) ? colors.Links: '#000000'}} className="subheader">
          <i style={{color: (colors && colors.Links) ? colors.Links: '#000000'}} 
            className="material-icons">people</i>
            Peoples {users? `(${users.length})`:<LoadingSmall />}        
        </a>
      </li>
      
      {users.length > 0 && users.map(userItem => 
        <li key={userItem.uid} 
          onClick={() => setChannel(userItem)}
          style={{opacity: '0.7', marginLeft: '15px'}}>
          
          <a style={{color: (colors && colors.Links) ? colors.Links: '#000000'}}>
            @ {userItem.name.toUpperCase()}
            {currentChannel && currentChannel.id !== (userItem.uid < user.uid?
              user.uid+userItem.uid: userItem.uid+user.uid) && 
              notifyChannels.includes(userItem.uid < user.uid?
              user.uid+userItem.uid: userItem.uid+user.uid) && 
                <span className="new badge blue"></span>}

            {active && active.includes(userItem.uid)? 
              <i style={{color: (colors && colors.Links) ? colors.Links: '#000000'}} 
                className="material-icons green-text right tiny" title="Online"
                style={{cursor: 'pointer'}}>brightness_1</i>:
              <i className="material-icons red-text right tiny" title="Offline"
                style={{cursor: 'pointer'}}>brightness_1</i>}
          </a>
        </li>)}
    </Fragment>
  )
}

DirectMessages.propTypes = {
  user: PropTypes.object.isRequired,
  setPrivateChannel: PropTypes.func.isRequired,
  setColor: PropTypes.func.isRequired,
  colors: PropTypes.object.isRequired,
  setNotificationChannel: PropTypes.func.isRequired,
  clearNotificationForCurrent:PropTypes.func,
  channels:PropTypes.object.isRequired,
  active: PropTypes.array.isRequired,
  setActiveUsers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  channels: state.channels
});

export default connect(mapStateToProps, {
  setPrivateChannel, setColor, 
  setNotificationChannel, clearNotificationForCurrent, setActiveUsers
})(DirectMessages);
