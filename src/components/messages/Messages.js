import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import MessageItem from './MessageItem';
import firebase from '../../firebase';
import { setMessages } from '../../actions/messages';

const Messages = ({channels: {currentChannel, loading}, user: {currentUser}, 
  messages, setMessages}) => {
  const [userCount, setUserCount] = useState(0);
  const [messagesArr, setMessagesArr] = useState([]);
  
  useEffect(() => {    
    if(currentChannel && currentUser){
      messageLoad(currentChannel.id);
    }
        
  }, [currentChannel]);

  useEffect(() => {
    if(messages.messages.length > 0){
      setMessagesArr(messages.messages);
      setUserCount((new Set(messages.messages.map(msg => msg.user.id))).size);
    }    
  }, [messages]);

  const messageLoad = channelId => {
    let loadedMessages = [];    
    let messageRef = currentChannel.isPrivateChannel ? 
    firebase.database().ref('privatemessages') : firebase.database().ref('messages');
    messageRef.child(channelId).on('child_added', snap => {
      loadedMessages.push(snap.val());
      setMessages(loadedMessages, channelId);
    });
  }

  const searchMessages = searchTerm => {
    if((searchTerm.trim()).length > 0){
      searchTerm = searchTerm.trim();
      const regex = new RegExp(searchTerm, 'gi');
      const result = [];
      messages.messages.map(msg => {
        // console.log(msg);
        if(msg.content && msg.content.match(regex)){
          result.push(msg);
        }
      });
      setMessagesArr(result);
    }else{
      setMessagesArr(messages.messages);
    }    
  }

  const starToggle = async (channelObj, cuid) => {
    let strUsr = channelObj.starredUsers? channelObj.starredUsers: [];
    if(strUsr.includes(cuid)){
      strUsr.pop(cuid);
    }else{
      strUsr.push(cuid);
    }
    const newChannel = {
      ...channelObj, 
      starredUsers: strUsr
    };
    
    await firebase.database().ref('channels').child(channelObj.id).update(newChannel);    
  }

  return (
    loading? <Spinner/> :<Fragment>      
      <div className="row card" id="messageDiv">
        <div className="col l6 s12 m4" style={{ padding: '5px'}}>
          <div className="channel-heading">
          {(currentChannel && currentChannel.isPrivateChannel)? '@ ': '# '}
          {currentChannel && (currentChannel.name)}
          {currentChannel && currentUser &&(<i className="material-icons" 
            style={{cursor: 'pointer', color: 'gold'}} 
            title={(currentChannel && currentChannel.starredUsers &&
               !currentChannel.starredUsers.includes(currentUser.uid))? 'Add to favorite':'Remove from favorite'}
            onClick={() => starToggle(currentChannel, currentUser.uid)} >
            {(currentChannel && currentChannel.starredUsers &&
               currentChannel.starredUsers.includes(currentUser.uid))? 'star':'star_border'}</i>)}
          </div>
          {currentChannel && !currentChannel.isPrivateChannel && <span>Total Users: {userCount}</span>}
        </div>
        <div className="col l6 s12 m8">
          <div className="col l10 s10 m10">
            <input type="text" placeholder="Search messages..." onChange={e => searchMessages(e.target.value)} />
          </div>
          <div className="col l2 s2 m2">
            <i className="material-icons" style={{paddingTop: '15px'}}>search</i>
          </div>
        </div>          
      </div>
      <div className="row">
        <div className="card" style={{minHeight: '400px', padding: '5px'}}>              
          {messages.messages.loading? 
            <Spinner />: 
            (currentChannel && currentChannel.id == messages.channelId &&
            messages.messages.length > 0)?
              messagesArr.length > 0?
                <ul className="collection">
                  {messagesArr.map((msg, index) => <MessageItem key={index} msg={msg} />)}
                </ul>: <h5>No match found</h5>
              : <h5>No Messages Posted yet</h5>}
        </div>
      </div>
    </Fragment>
  )
}

export default connect(null, {
  setMessages
})(Messages);
