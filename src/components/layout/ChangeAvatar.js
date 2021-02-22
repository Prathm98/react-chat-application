import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';
import firebase from '../../firebase';
import M from 'materialize-css';
import LoadingSmall from './LoadingSmall';
import { connect } from 'react-redux';
import { updateUserAvatar } from '../../actions/user';

const ChangeAvatar = ({user: {currentUser}, updateUserAvatar}) => {
  const [srcImage, setSrcImage] = useState('');
  const [blob, setBlob] = useState('');
  const [loading, setLoading] = useState(false);
  const [refs, setRefs] = useState({
    storageRef: firebase.storage().ref(),
    userRef: firebase.auth().currentUser,
    usersRef: firebase.database().ref("users")
  });
  const [btnRef, setBtnRef] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setBtnRef(React.createRef());
  }, []);

  const handleChange = e => {
    setError('');
    const file = e.target.files[0];
    const reader = new FileReader();

    if(file){
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        setSrcImage(reader.result);
      });
    }else{
      setError('');
      setSrcImage('');
    }
  }

  const setEditorRef = editor => {
    setError('');
    if (editor !== null) {
      editor.getImageScaledToCanvas().toBlob(blob => {
        const url = URL.createObjectURL(blob);
        setBlob(blob);
      });      
    }    
  };

  const uploadCroppedImage = () =>{
    setLoading(true);
    setError('');
    refs.storageRef
      .child(`avatars/users/${refs.userRef.uid}`)
      .put(blob)
      .then(snap => {
        snap.ref.getDownloadURL().then(downloadURL => {
          changeAvatar(downloadURL);
          M.toast({html: "Avatar updated"});          
          setLoading(false);
          updateUserAvatar(downloadURL);
          btnRef.current.click();
        });
      });
  };

  const changeAvatar = (downloadURL) => {
    refs.userRef
      .updateProfile({
        photoURL: downloadURL
      })
      .then(() => {
        // console.log("PhotoURL updated");
      })
      .catch(err => {
        setError('Unable to update avatar. Please try after some time.');
        console.error(err);
      });

      refs.usersRef
      .child(currentUser.uid)
      .update({ avatar: downloadURL })
      .then(() => {
        // console.log("User avatar updated");
      })
      .catch(err => {
        setError('Unable to update avatar. Please try after some time.');
        console.error(err);
      });
  };

  return (
    <Fragment>
      <div id="changeAvatarModal" className="modal">
        <div className="modal-content">
          <h4 className="text-center"> Change Avatar</h4><br />
          {error !== '' && <p className="red">{error}</p>}
          {loading? <div className="text-center">
            <LoadingSmall /><br />
            <h5>Uploading ...</h5>
          </div>:
          <Fragment><div className="file-field input-field">
            <div className="btn">
              <span>File</span>
              <input type="file" onChange={e => handleChange(e)} />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" readOnly />
            </div>
          </div>
          <div className="row">
            <div className="col l6 m6 s12">
              {srcImage !== '' && 
                <AvatarEditor 
                  ref={setEditorRef}
                  image={srcImage} 
                  scale={1.2} />}
            </div>            
          </div></Fragment>}
        </div>
        {!loading && <div className="modal-footer">
          {blob !== '' && <a href="#!" className="waves-effect waves-green btn-flat"
            onClick={uploadCroppedImage}>
            <i className="material-icons left">send</i>Upload</a>}           
          <a href="#!" ref={btnRef} className="modal-close waves-effect waves-red btn-flat">
            <i className="material-icons left">close</i>Cancel</a>
        </div>}
      </div>
    </Fragment>
  )
}

ChangeAvatar.propTypes = {
  user: PropTypes.object.isRequired,
  updateUserAvatar: PropTypes.func.isRequired
}

export default connect(null, {
  updateUserAvatar
})(ChangeAvatar);
