import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { setCurrentChannel, setChannels, 
  setNotificationChannel, clearNotificationForCurrent } from '../../actions/channels';

const ChannelsSideNav = ({ setCurrentChannel, setChannels, channels: {currentChannel, channels, 
  loading, notifyChannels}, setNotificationChannel, clearNotificationForCurrent }) => {
  const [channelRef, setChannelRef] = useState(firebase.database().ref('channels'));

  useEffect(() => {
    loadChannels();
    checkNotifications();

    return(() => {
      channelRef.off()
    });
  }, []);

  const checkNotifications = () => {
    firebase.database().ref('messages').on('child_changed', snap => {
      setNotificationChannel(snap.key);
    });
  }

  const loadChannels = () => {
    let loadedChannels = [];
    let currentLoaded = false;
    channelRef.on('child_added', snap => {      
      loadedChannels.push(snap.val());
      setChannels(loadedChannels);
      currentChannelSet(loadedChannels, currentLoaded);
      currentLoaded = true;      
    });    
  }

  const currentChannelSet = (arr, currentLoaded) => {
    if(!currentLoaded){
      setCurrentChannel(arr[0]);
      clearNotificationForCurrent(arr[0].id);      
    }
  }

  return (
    <Fragment>
      <li><a className="subheader">
        <i className="material-icons">group_work</i>
        Channels ({channels.length})
      </a></li>
      <li><a href="#addChannelModal" className="modal-trigger">
        <i className="material-icons">add</i> Add Channel
      </a></li>
      {channels.length > 0 && channels.map(channel => <li key={channel.id} 
        onClick={() => {setCurrentChannel(channel); clearNotificationForCurrent(channel.id)}}
        className={(currentChannel && currentChannel.id == channel.id)? 'active': ''}
        style={{opacity: '0.7', marginLeft: '15px'}}>
        <a>
          # {channel.name} 
          {currentChannel && currentChannel.id !== channel.id && 
            notifyChannels.includes(channel.id) && <span className="new badge blue"></span>}
        </a>
      </li>)}
    </Fragment>
  )
}

ChannelsSideNav.propTypes = {
  channels: PropTypes.object.isRequired,
  setCurrentChannel: PropTypes.func.isRequired,
  setChannels: PropTypes.func.isRequired
}

const mapStateToProp = state => ({
  channels: state.channels
});

export default connect(mapStateToProp, {
  setCurrentChannel, setChannels, setNotificationChannel, clearNotificationForCurrent
})(ChannelsSideNav);
