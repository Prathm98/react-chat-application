import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from '../../firebase';
import Spinner from '../layout/Spinner';
import M from 'materialize-css';
import LoadingSmall from '../layout/LoadingSmall';

const MessageForm = ({channels: {currentChannel, loading}, user}) => {
  const [message, setMessage] = useState('');
  const [messageRef, setMessageRef] = useState(firebase.database().ref('messages'));
  const [loadingMsg, setLoadingMsg] = useState(false);  

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
        await messageRef.child(currentChannel.id).push().set(newMessage);
        setMessage('');    
      } catch (err) {
        M.toast({html: "Unable to send message"});
      }

      setLoadingMsg(false);
    }    
  }

  return (
    (user.loading || loading)? <Spinner />:<Fragment>
      <div className=" card col l9 m12 s12">
        <div className="input-field col s12">
          <i className="material-icons prefix">message</i>
          <input name="message" id="message" type="text" className="validate"
            required placeholder="Type something...." value={message}
            onChange={e => setMessage(e.target.value)} />          
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
      </div>      
    </Fragment>
  )
}

MessageForm.propTypes = {
  channels: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default MessageForm;
