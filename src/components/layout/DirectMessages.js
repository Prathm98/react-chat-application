import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingSmall from './LoadingSmall';
import firebase from '../../firebase';
import { setUser } from '../../actions/user';

const DirectMessages = ({user}) => {
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
        user['status'] = 'offline';
        loadedUsers.push(user);
        setUsers(loadedUsers);
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

  const addStatusToUser = (uid, connected = true) => {
    let updatedUsers = [];
    users.map(userItem => {      
      if(uid === userItem.uid){
        userItem['status'] = `${ connected ? 'online': 'offline'}`;
      }
      updatedUsers.push(userItem);
    })
    setUsers(updatedUsers);
  }

  return (
    <Fragment>
      <li><a className="subheader">
        <i className="material-icons">people</i>
        Direct Messages {users? `(${users.length})`:<LoadingSmall />}        
      </a></li>
      {users.length > 0 && users.map(userItem => <li key={userItem.uid} 
        onClick={() => console.log(userItem)}
        style={{opacity: '0.7', marginLeft: '15px'}}>
        <a>{userItem.name} 
        {activeUsers.includes(userItem.uid)? 
          <i className="material-icons green-text right tiny" title="Online"
           style={{cursor: 'pointer'}}>brightness_1</i>:
          <i className="material-icons red-text right tiny" title="Offline"
           style={{cursor: 'pointer'}}>brightness_1</i>}</a>
      </li>)}
    </Fragment>
  )
}

DirectMessages.propTypes = {

}

export default DirectMessages;
