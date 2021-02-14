import React, { Fragment, useEffect } from 'react';
import M from 'materialize-css';
import Navbar from './layout/Navbar';
import Messages from './messages/Messages';

const Home = () => {
  useEffect(() => {
    M.AutoInit();
  }, []);
  return (
    <Fragment>
      <Navbar />
      <Messages />
    </Fragment>
  )
}

export default Home;
