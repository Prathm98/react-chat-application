import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingSmall from './LoadingSmall';
import { connect } from 'react-redux';
import firebase from '../../firebase';
import M from 'materialize-css';

const AddChannel = ({ user: { currentUser }}) => {
  const [formData, setFormData] = useState({
    name: '', details: ''
  });
  const [channelRef, setChannelRef] = useState(firebase.database().ref('channels'));
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({type: 'danger', error: []});

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const { name, details } = formData;

  const onSubmit = async e => {
    e.preventDefault();
    if(name === null || name === undefined || (name.trim()).length < 1 || 
      details === null || details === undefined || (details.trim()).length < 1){
      setErrors({type: 'danger', error: ['All Fields are required!!!']});
    }else{
      try {
        const key = channelRef.push().key;

        const newChannel = {
          id: key,
          name: name,
          details: details,
          createdBy: {
            name: currentUser.displayName,
            avatar: currentUser.photoURL
          }
        };

        await channelRef.child(key).update(newChannel);
        setFormData({name:'', details:''});
        M.toast({html: "Channel Added"});
      } catch (err) {
        console.error(err);
        M.toast({html: 'Unable to add channel'});
        setErrors({type: 'danger', error: [err.message]});
      }
    } 
  }

  return (
    <div id="addChannelModal" className="modal">
      <div className="modal-content">
        <h4><i className="material-icons">group_work</i> Add Channel</h4>
        <form>
          <div className="row">
            {errors.error.length > 0 && <div className={`error-${errors.type}`}>
              {errors.error.map((err, index) => <div key={index}>{err}<br /></div>)}
            </div>}
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input name="name" id="name" type="text" className="validate"
                onChange={e => {onChange(e)}} value={name} required />
              <label htmlFor="name">Channel Name</label>
            </div>
          
            <div className="input-field col s12">
              <textarea name="details" id="details" className="materialize-textarea"
                onChange={e => {onChange(e)}} value={details} required></textarea>
              <label htmlFor="details">details</label>
            </div>              
          </div>                       
        </form>
      </div>
      <div className="modal-footer">
        {loading ? <LoadingSmall />:<Fragment>
          <a href="#!" className="waves-effect waves-green btn-flat"
            onClick={e => onSubmit(e)}>Add</a>
          <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancel</a>
        </Fragment>}
      </div>
    </div>
  )
}

AddChannel.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProp = state => ({
  user: state.user
});

export default connect(mapStateToProp, {

})(AddChannel);
