import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import MessageItem from './MessageItem';
import firebase from '../../firebase';
import { setMessages } from '../../actions/messages';

const Messages = ({channels: {currentChannel, loading}, user: {currentUser}, 
  messages, setMessages}) => {
  const [messageRef, setMessageRef] = useState(firebase.database().ref('messages'));  
  
  useEffect(() => {    
    if(currentChannel && currentUser){
      messageLoad(currentChannel.id);
    }    
  }, [currentChannel]);

  const messageLoad = channelId => {
    let loadedMessages = [];    
    messageRef.child(channelId).on('child_added', snap => {
      loadedMessages.push(snap.val());
      setMessages(loadedMessages, channelId);      
    });
  }

  return (
    loading? <Spinner/> :<Fragment>      
      <div className="row card channel-heading">
        <div className="col l6 s12 m4">
          {currentChannel && currentChannel.name} <i className="material-icons">star_border</i>
        </div>
        <div className="col l6 s12 m8">
          <div className="col l10 s10 m10">
            <input type="text" placeholder="Search messages..." />
          </div>
          <div className="col l2 s2 m2">
            <i className="material-icons" style={{paddingTop: '15px'}}>search</i>
          </div>
        </div>          
      </div>
      <div className="row">
        <div className="card" style={{minHeight: '400px', padding: '5px'}}>              
          {messages.messages.loading? <Spinner />: (currentChannel && currentChannel.id == messages.channelId &&
            messages.messages.length > 0)? 
            <ul className="collection">
              {messages.messages.map((msg, index) => <MessageItem key={index} msg={msg} />)}
            </ul>: <h5>No Messages Posted yet</h5>}
        </div>
      </div>
    </Fragment>
  )
}

export default connect(null, {
  setMessages
})(Messages);
