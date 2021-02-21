import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from '../../firebase';
import M from 'materialize-css';
import LoadingSmall from '../layout/LoadingSmall';
import { Picker, emojiIndex } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import DetailSkeleton from '../layout/DetailSkeleton';

const MessageForm = ({channels: {currentChannel, loading}, user}) => {
  const [message, setMessage] = useState('');
  const [isEmoji, setIsEmoji] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [typingRef, setTypingRef] = useState(firebase.database().ref('typing'));
  const [inputRef, setInputRef] = useState(React.createRef());

  const onSubmit = async () => {
    if(message === null || message === undefined || (message.trim()).length < 1){
      M.toast({html: "Message field is required."});
    }else{
      const newMessage = {
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: {
          id: user.currentUser.uid,
          name: user.currentUser.displayName,
          avatar: user.currentUser.photoURL
        },
        content: message
      };
      setLoadingMsg(true);

      try {
        let messageRef = currentChannel.isPrivateChannel ? 
          firebase.database().ref('privatemessages') : firebase.database().ref('messages');
        await messageRef.child(currentChannel.id).push().set(newMessage);
        setMessage('');
        typingRef.child(currentChannel.id).child(user.currentUser.uid).remove();
      } catch (err) {
        M.toast({html: "Unable to send message"});
      }

      setLoadingMsg(false);
    }    
  }

  const handleKeyUp = () => {
    if(message.length > 0){
      typingRef.child(currentChannel.id).child(user.currentUser.uid).set(user.currentUser.displayName);
    }else{
      typingRef.child(currentChannel.id).child(user.currentUser.uid).remove();
    }
  }

  const toggleEmoji = () => {
    setIsEmoji(!isEmoji);
  }

  const handleAddEmoji = emoji => {
    const newMessage = colonToUnicode(` ${message} ${emoji.colons} `);
    setMessage(newMessage);
    setIsEmoji(false);
    setTimeout(() => inputRef.focus(), 0);
  };

  const colonToUnicode = message => {
    return message.replace(/:[A-Za-z0-9_+-]+:/g, x => {
      x = x.replace(/:/g, "");
      let emoji = emojiIndex.emojis[x];
      if (typeof emoji !== "undefined") {
        let unicode = emoji.native;
        if (typeof unicode !== "undefined") {
          return unicode;
        }
      }
      x = ":" + x + ":";
      return x;
    });
  };

  return (
    (user.loading || loading)? <div className="card">
      <br /><DetailSkeleton /><br />
    </div>:<Fragment>
      <div className=" card col l9 m12 s12">
        <form>
          {isEmoji && <Picker 
            set="apple"
            className="emojiPicker"
            title="Pick Your Emoji"
            emoji="point_up"
            onSelect={handleAddEmoji}
          />}
          <div className="input-field col s12">
            <i className="material-icons prefix" style={{cursor: 'pointer'}}
              onClick={toggleEmoji}>mood</i>
            <input name="message" id="message" type="text" className="validate"
              required placeholder="Type something...." value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyUp={handleKeyUp} ref={node => setInputRef(node)} />          
            <br /> 
            {loadingMsg ? <LoadingSmall />:
            <button type="submit" className="waves-effect waves-light btn"
              onClick={onSubmit}>
              <i className="material-icons right">send</i>
              Send
            </button>}{' '}
            <a className="waves-effect waves-light btn modal-trigger" href="#uploadFileModal">
              <i className="material-icons right">attach_file</i>Upload File
            </a>                      
          </div>
        </form>          
      </div>      
    </Fragment>
  )
}

MessageForm.propTypes = {
  channels: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default MessageForm;
