import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';
import Spinner from './Spinner';

const MetaPanel = ({messages:{messages, loading}, channels}) => {
  // const [topPoster, setTopPoster] = useState({});
  
  useEffect(() => {
    M.AutoInit();
    // if(messages){
    //   setTopPoster(messages.reduce((acc, msg) => {
    //     if(msg.user.name in acc){
    //       acc[msg.user.name].count += 1;
    //     }else{
    //       acc[msg.user.name] = {
    //         avatar: msg.user.avatar,
    //         count: 1
    //       }
    //     }
    //     return acc;
    //   }, {}));
      // console.log(topPoster);
    // }
  }, []);  
  
  return (
    (loading && channels.loading) ? <Spinner />:<Fragment>    
      <ul className="collapsible">
        <li key='0' className="active">
          <div className="collapsible-header"><i className="material-icons">info</i>
            {channels.currentChannel && channels.currentChannel.name}'s Details</div>
          <div className="collapsible-body"><span>
            {channels.currentChannel && channels.currentChannel.details}</span></div>
        </li>
        {/* <li key='1'>
          <div className="collapsible-header"><i className="material-icons">timeline</i>Top Poster</div>
          <div className="collapsible-body">
            {topPoster.length > 0 && Object.entries(topPoster)
              .map( ([key, value]) => <span>{key}</span> )}
          </div>
        </li> */}
        <li key='2'>
          <div className="collapsible-header"><i className="material-icons">border_color</i>
            Created By</div>
          <div className="collapsible-body"><span>
            {channels.currentChannel && <ul><li className="collection-item avatar text-center">
              <img src={channels.currentChannel.createdBy.avatar} alt="" className="circle" /><br />
              <span className="title">
                <strong>{channels.currentChannel.createdBy.name.toUpperCase()}</strong>                 
              </span>
            </li></ul>}
          </span></div>
        </li>
      </ul>        
    </Fragment>
  )
}

MetaPanel.propTypes = {
  messages: PropTypes.object.isRequired,
  channels: PropTypes.object.isRequired
}

export default MetaPanel;
