import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import background from '../../img/background.jpg';
import { clearUser } from "../../actions/user";
import firebase from '../../firebase';
import PropTypes from 'prop-types';
import ChannelsSideNav from './ChannelsSideNav';
import DirectMessages from './DirectMessages';

const Navbar = ({ clearUser, user: {currentUser} }) => {
  const logout = async () => {
    try {
      await firebase.auth().signOut();
      console.log('Sign out');
      clearUser();
    } catch (err) {
      console.error(err);
    }    
  }

  return (
    <div>
      <ul id="slide-out" className="sidenav sidenav-fixed">
        <li>
          <div className="user-view">
            <div className="background">
              <img src={background} />
            </div>
            <Link to="/" className="brand-logo center white-text">
              <i className="material-icons white-text medium center">whatshot</i>
            </Link>
            <a><span className="white-text name"><strong style={{textTransform: 'uppercase'}}>
              {(currentUser && currentUser.displayName)? currentUser.displayName: 'User\'s name'}
            </strong></span></a>
            <a href="#email"><span className="white-text email">View Profile</span></a>            
          </div>
        </li>
        <ChannelsSideNav user={currentUser} />
        <DirectMessages user={currentUser} />
        <li><a href="#!" onClick={logout}>
          <i className="material-icons">keyboard_return</i>Sign Out
        </a></li>
      </ul>

      <nav className="hide-on-large-only">
        <div className="nav-wrapper" style={{
          backgroundImage: `url(${background})`, 
          backgroundPosition: 'bottom'
        }}>
          <Link to="/" className="brand-logo center white-text">
            <i className="material-icons white-text small">whatshot</i>
            Chat App
          </Link>          
          <ul id="nav-mobile" className="left">
            <a href="#" data-target="slide-out" className="sidenav-trigger">
              <i className="material-icons white-text">menu</i>
            </a>            
          </ul>
        </div>
      </nav>      
    </div>
  )
}

Navbar.prototype = {
  clearUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  user: state.user
});

export default connect(mapStateToProp, {
  clearUser
})(Navbar);
