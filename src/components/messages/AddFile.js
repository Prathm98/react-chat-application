import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';
import mime from 'mime-types';

const AddFile = props => {
  const [file, setFile] = useState(null);
  const authorized = ['image/jpeg', 'image/png'];

  const sendFile = () => {
    if(file){
      if(authorized.includes(mime.lookup(file))){
        const metadata = {contentType: mime.lookup(file)};
        // Call to upload function
      }
    }else{
      M.toast({html: "Please select the file"});
    }
  }

  return (
    <Fragment>
      <div id="uploadFileModal" className="modal bottom-sheet">
        <div className="modal-content">
          <h5>Upload a File</h5>
          <form action="#">
            <div className="file-field input-field">
              <div className="btn">
                <span>File</span>
                <input type="file" onChange={e => setFile(e.target.files[0])} />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <a href="#!" className="waves-effect waves-green btn-flat" onClick={sendFile}>Upload</a>
          <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancel</a>
        </div>
      </div>
    </Fragment>
  )
}

AddFile.propTypes = {

}

export default AddFile;
