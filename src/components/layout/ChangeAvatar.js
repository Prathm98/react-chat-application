import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ChangeAvatar = props => {
  return (
    <Fragment>
      <div id="changeAvatarModal" className="modal">
      <div className="modal-content">
        <h4 className="text-center"> Change Avatar</h4><br />
        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input type="file" />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" readOnly />
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a href="#!" className="waves-effect waves-green btn-flat">
          <i className="material-icons left">send</i>Upload</a>
        <a href="#!" className="waves-effect waves-blue btn-flat">
          <i className="material-icons left">photo</i>Preview</a>   
        <a href="#!" className="modal-close waves-effect waves-red btn-flat">
          <i className="material-icons left">close</i>Cancel</a>
      </div>
    </div>
    </Fragment>
  )
}

ChangeAvatar.propTypes = {

}

export default ChangeAvatar;
