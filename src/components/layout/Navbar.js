import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import background from '../../img/background.jpg';
import { clearUser } from "../../actions/user";
import firebase from '../../firebase';
import PropTypes from 'prop-types';

const Navbar = ({ clearUser }) => {
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
            <i className="material-icons white-text medium center">whatshot</i>                          
            <a><span className="white-text name">Prathmesh Wakodikar</span></a>            
            <a href="#email"><span className="white-text email">View Profile</span></a>            
          </div>
        </li>
        <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
        <li><a href="#!">Second Link</a></li>
        <li><div className="divider"></div></li>
        <li><a className="subheader">Subheader</a></li>
        <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
        <li><div className="divider"></div></li>
        <li><a href="#!" onClick={logout}>Sign Out</a></li>
      </ul>

      <nav className="hide-on-large-only">
        <div className="nav-wrapper" style={{
          backgroundImage: `url(${background})`, 
          backgroundPosition: 'bottom'
        }}>
          <Link to="/" className="brand-logo center white-text">Chat App</Link>          
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
  clearUser: PropTypes.func.isRequired
};

export default connect(null, {
  clearUser
})(Navbar);
