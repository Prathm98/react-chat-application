import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const ChannelsSideNav = props => {
  const [channels, setChannels] = useState([]);  

  return (
    <Fragment>
      <li><a className="subheader">
        <i className="material-icons">group_work</i>
        Channels ({channels.length})
      </a></li>
      <li><a href="#addChannelModal" className="modal-trigger">
        <i className="material-icons">add</i> Add Channel
      </a></li>      
    </Fragment>
  )
}

ChannelsSideNav.propTypes = {

}

export default ChannelsSideNav;
