import React, { Fragment, useEffect } from 'react';
import M from 'materialize-css';
import Navbar from './layout/Navbar';
import Messages from './messages/Messages';
import AddChannel from './layout/AddChannel';

const Home = () => {
  useEffect(() => {
    M.AutoInit();
  }, []);
  return (
    <Fragment>
      <Navbar />
      <Messages />
      <AddChannel />
    </Fragment>
  )
}

export default Home;
