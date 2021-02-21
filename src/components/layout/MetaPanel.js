import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';
import { setColor } from '../../actions/user';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import DetailSkeleton from './DetailSkeleton';

const MetaPanel = ({channels, user, setColor}) => {
  const [colors, setColors] = useState({
    Sidebar: '#ffffff', Links: '#000000', Background: '#f3f3f3'
  });

  useEffect(() => {
    M.AutoInit();

    if(user && user.colors){
      setColors(user.colors);
    }
  }, []);
  
  useEffect(() => {
    if(user && user.colors){
      setColors(user.colors);
    }
  }, [user]);
  
  const setColorLocal = () => {    
    firebase.database().ref('users').child(user.currentUser.uid).update({
      uid: user.currentUser.uid,
      avatar: user.currentUser.photoURL,
      colors: colors
    });
    setColor(colors);
  }

  return (
    (channels.loading) ? <Fragment>
      <DetailSkeleton /><DetailSkeleton /><DetailSkeleton /><DetailSkeleton /><DetailSkeleton />
    </Fragment>:<Fragment>    
      <ul className="collapsible">
        {channels.currentChannel && channels.currentChannel.createdBy &&
          <li key='0' className="active">
            <div className="collapsible-header">
              <i className="material-icons">info</i>
              {channels.currentChannel && channels.currentChannel.name}'s Details
            </div>
            <div className="collapsible-body">
              <span>{channels.currentChannel && channels.currentChannel.details}</span>
            </div>
          </li>}

        {channels.currentChannel && channels.currentChannel.createdBy && 
          <li key='2'>
            <div className="collapsible-header">
              <i className="material-icons">border_color</i>
              Created By
            </div>
            <div className="collapsible-body">
              <span>
              {channels.currentChannel && <ul>
                <li className="collection-item avatar text-center">
                  <img src={channels.currentChannel.createdBy.avatar} alt="" className="circle" /><br />
                  <span className="title">
                    <strong>{channels.currentChannel.createdBy.name.toUpperCase()}</strong>                 
                  </span>
                </li>
              </ul>}
            
              </span>
            </div>
          </li>}

        <li>
          <div className="collapsible-header">
            <i className="material-icons">colorize</i>Choose colors          
          </div>
          <div className="collapsible-body">
            <span>
              <input type="color" value={colors.Sidebar} 
                onChange={e => setColors({...colors, Sidebar: e.target.value})}/> SideBar <br /><br />
              <input type="color" value={colors.Links} 
                onChange={e => setColors({...colors, Links: e.target.value})}/> Links <br /><br />
              <input type="color" value={colors.Background} 
                onChange={e => setColors({...colors, Background: e.target.value})}/> Background <br /><br />
              <button className="btn" onClick={setColorLocal}>Set Color</button>
            </span>
          </div>
        </li>
      </ul>        
    </Fragment>
  )
}

MetaPanel.propTypes = {
  channels: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setColor: PropTypes.func.isRequired
}

export default connect(null, {
  setColor
})(MetaPanel);
