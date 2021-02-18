import React, { Fragment, useEffect } from 'react';
import M from 'materialize-css';
import Navbar from './layout/Navbar';
import Messages from './messages/Messages';
import AddChannel from './layout/AddChannel';
import MessageForm from './messages/MessageForm';
import AddFile from './messages/AddFile';
import { connect } from 'react-redux';
import MetaPanel from './layout/MetaPanel';

const Home = ({ channels, user, messages }) => {
  useEffect(() => {
    M.AutoInit();
  }, []);
  return (
    <Fragment>
      <Navbar />
      <div className="message-sidenav">
        <div className="row">
          <div className="col l8 m8 s12">
          <Messages user={user} channels={channels} messages={messages} />
          </div>
          <div className="col l4 m4 s12">
            {channels && messages && channels.currentChannel && 
              <MetaPanel channels={channels} messages={messages} />}
          </div>
          <AddChannel />
        </div>
        <div className="row" style={{
          padding: '0%', position: 'fixed', bottom: '0', width: '100%', marginBottom: '0'
        }}>
        <MessageForm user={user} channels={channels} />
        </div>  
      </div>
      { channels && user && <AddFile channels={channels} user={user} /> }
    </Fragment>
  )
}

const mapStateToProps = state => ({
  channels: state.channels,
  user: state.user,
  messages: state.messages
});

export default connect(mapStateToProps, {

})(Home);
