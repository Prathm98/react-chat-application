import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingSmall from './LoadingSmall';
import firebase from '../../firebase';
import { setChannels, setPrivateChannel } from '../../actions/channels';
import { setColor } from '../../actions/user';
import { connect } from 'react-redux';

const DirectMessages = ({user, setPrivateChannel, setColor, colors}) => {
  const [users, setUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [presenceRef, setPresenceRef] = useState(firebase.database().ref('presence'));

  useEffect(() => {
    if(user){
      loadUsers(user.uid);
    }
  }, [user]);

  const loadUsers = uid => {
    let loadedUsers = [];
    firebase.database().ref('users').on('child_added', snap => {      
      if(uid !== snap.key){
        let user = snap.val();
        user['uid'] = snap.key;
        // user['status'] = 'offline';
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

    presenceRef.on('child_added', snap => {
      if(uid != snap.key){        
        if(!activeUsers.includes(snap.key)){
          setActiveUsers([...activeUsers, snap.key]);
        }        
      }      
    });

    presenceRef.on('child_removed', snap => {
      if(uid != snap.key){        
        setActiveUsers(activeUsers.map(userId => snap.key !== userId));
      }
    });
  }

  const setChannel = userObj => {
    setPrivateChannel({
      name: userObj.name.toUpperCase(),
      id: userObj.uid < user.uid? user.uid+userObj.uid: userObj.uid+user.uid,
      isPrivateChannel: true
    });
  }

  return (
    <Fragment>
      <li><a style={{color: (colors && colors.Links) ? colors.Links: '#000000'}} className="subheader">
        <i style={{color: (colors && colors.Links) ? colors.Links: '#000000'}} className="material-icons">people</i>
        Peoples {users? `(${users.length})`:<LoadingSmall />}        
      </a></li>
      {users.length > 0 && users.map(userItem => <li key={userItem.uid} 
        onClick={() => setChannel(userItem)}
        style={{opacity: '0.7', marginLeft: '15px'}}>
        <a style={{color: (colors && colors.Links) ? colors.Links: '#000000'}}>@ {userItem.name.toUpperCase()} 
        {activeUsers.includes(userItem.uid)? 
          <i style={{color: (colors && colors.Links) ? colors.Links: '#000000'}} className="material-icons green-text right tiny" title="Online"
           style={{cursor: 'pointer'}}>brightness_1</i>:
          <i className="material-icons red-text right tiny" title="Offline"
           style={{cursor: 'pointer'}}>brightness_1</i>}</a>
      </li>)}
    </Fragment>
  )
}

DirectMessages.propTypes = {
  user: PropTypes.object.isRequired,
  setPrivateChannel: PropTypes.func.isRequired
}

export default connect(null, {
  setPrivateChannel, setColor
})(DirectMessages);
