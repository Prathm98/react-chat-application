import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';
import mime from 'mime-types';
import firebase from '../../firebase';
import {v4} from 'uuid';

const AddFile = ({channels:{currentChannel}, user}) => {
  const [file, setFile] = useState(null);
  const authorized = ['image/jpeg', 'image/png'];
  const [msgRef, setMsgRef] = useState(firebase.database().ref('messages'));
  const [storageRef, setStorageRef] = useState(firebase.storage().ref());
  const [upload, setUpload] = useState({
    uploadState: '', percentageUpload: 0
  });

  const sendFile = () => {
    if(file){
      if(authorized.includes(file.type)){
        const metadata = {contentType: file.type};
        // Call to upload function
        uploadFile(file, metadata);
      }
    }else{
      M.toast({html: "Please select the file"});
    }
  }

  const uploadFile = async (file, metadata) => {    
    const pathToUpload = currentChannel.id;
    const ext = file.type == "image/jpeg"? 'jpg': 'png';
    const filePath = `chat/public/${v4()}.${ext}`;
    const temp = storageRef.child(filePath).put(file);

    setUpload({uploadState: 'uploading', percentageUpload: 0});
    
    temp.on('state_changed', snap => {
      const percentageUpload = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      setUpload({uploadState: 'uploading', percentageUpload: percentageUpload});      
    }, err => {
      console.error(err);
      setUpload({ uploadState: '', percentageUpload: 0});
      M.toast({html: 'File upload failed'});
    }, () => {
      temp.snapshot.ref.getDownloadURL().then(url => {
        sendMessage(pathToUpload, url);
        M.toast({html: 'File uploaded'});
        setUpload({uploadState: '', percentageUpload: 0});
      }, err => {
        console.error(err);
        setUpload({ uploadState: '', percentageUpload: 0});
        M.toast({html: 'File upload failed'});
      })
    })
  }

  const sendMessage = async (pathToUpload, url) => {
    const newMessage = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: user.currentUser.uid,
        name: user.currentUser.displayName,
        avatar: user.currentUser.photoURL
      },
      image: url
    };

    try {
      await msgRef.child(pathToUpload).push().set(newMessage);
      setFile(null);        
    } catch (err) {
      M.toast({html: "Unable to send message"});
    }
  }

  return (    
    <Fragment>      
      <div id="uploadFileModal" className="modal bottom-sheet">
        <div className="modal-content">
          <h5>Upload a File</h5>          
          {upload.uploadState == 'uploading'? 
          <div className="text-center">
            <div className="progress">
              <div className="determinate" style={{width: `${upload.percentageUpload}%`}}></div>
            </div>
            <h5>Uploading {upload.percentageUpload}%</h5>
          </div>
          :<form action="#">
            <div className="file-field input-field">
              <div className="btn">
                <span>File</span>
                <input type="file" onChange={e => setFile(e.target.files[0])} />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" value={file ? file.name? file.name: '': ''} readOnly />
              </div>
            </div>
          </form>}
        </div>
        {upload.uploadState != 'uploading' && <div className="modal-footer">
          <a href="#!" className="waves-effect waves-green btn-flat" onClick={sendFile}>Upload</a>
          <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancel</a>
        </div>}
      </div>
    </Fragment>
  )
}

AddFile.propTypes = {
  channels: PropTypes.object.isRequired
}

export default AddFile;
