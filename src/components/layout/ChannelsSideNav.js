import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { setCurrentChannel, setChannels } from '../../actions/channels';

const ChannelsSideNav = ({ setCurrentChannel, setChannels, channels: {currentChannel, channels, loading} }) => {
  const [channelRef, setChannelRef] = useState(firebase.database().ref('channels'));

  useEffect(() => {
    loadChannels();

    return(() => {
      channelRef.off()
    });
  }, []);

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
        onClick={() => setCurrentChannel(channel)}
        className={(currentChannel && currentChannel.id == channel.id)? 'active': ''}
        style={{opacity: '0.7', marginLeft: '15px'}}>
        <a>
          # {channel.name}
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
  setCurrentChannel, setChannels
})(ChannelsSideNav);
