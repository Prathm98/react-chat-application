import React, { Fragment, useEffect } from 'react';
import M from 'materialize-css';
import Navbar from './layout/Navbar';
import Messages from './messages/Messages';
import AddChannel from './layout/AddChannel';
import MessageForm from './messages/MessageForm';

const Home = () => {
  useEffect(() => {
    M.AutoInit();
  }, []);
  return (
    <Fragment>
      <Navbar />
      <div className="message-sidenav">
        <div className="row">
          <div className="col l8 m8 s12">
            <Messages />
          </div>
          <div className="col l4 m4 s12">
            <div className="card">
              Abcd
            </div>
          </div>
          <AddChannel />
        </div>
        <div className="row" style={{
          padding: '0%', position: 'fixed', bottom: '0', width: '100%', marginBottom: '0'
        }}>
          <MessageForm />
        </div>  
      </div>
    </Fragment>
  )
}

export default Home;
