import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from '../../firebase';
import Spinner from '../layout/Spinner';
import M from 'materialize-css';
import LoadingSmall from '../layout/LoadingSmall';

const MessageForm = ({channels: {currentChannel, loading}, user}) => {
  const [message, setMessage] = useState('');
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [typingRef, setTypingRef] = useState(firebase.database().ref('typing'));

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

  return (
    (user.loading || loading)? <Spinner />:<Fragment>
      <div className=" card col l9 m12 s12">
        <form>
          <div className="input-field col s12">
            <i className="material-icons prefix">message</i>
            <input name="message" id="message" type="text" className="validate"
              required placeholder="Type something...." value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyUp={handleKeyUp} />          
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
