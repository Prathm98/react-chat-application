import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import background from '../../img/background.jpg';
import { clearUser } from "../../actions/user";
import firebase from '../../firebase';
import PropTypes from 'prop-types';
import ChannelsSideNav from './ChannelsSideNav';
import DirectMessages from './DirectMessages';
import Spinner from './Spinner';

const Navbar = ({ clearUser, user: {currentUser, loading}, colors }) => {
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
    loading && colors ? <Spinner /> :
    <div>      
      <ul id="slide-out" className="sidenav sidenav-fixed">                 
        <li>
          <div className="user-view" style={{marginBottom: '0'}}>
            <div className="background" style={{backgroundImage: `url(${background})`}}>
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
        <div style={{backgroundColor: colors.Sidebar? colors.Sidebar: '#f3f3f3'}}>
          <ChannelsSideNav user={currentUser} colors={colors} />
          <DirectMessages user={currentUser} colors={colors} />        
          <li><a style={{color: colors.Links? colors.Links: '#000000'}} href="#!" onClick={logout}>
            <i style={{color: colors.Links? colors.Links: '#000000'}} className="material-icons">keyboard_return</i>Sign Out
          </a></li>
        </div>
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
