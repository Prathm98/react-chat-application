import React from 'react';
import background from '../../img/background.jpg';

const Navbar = () => {
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
      </ul>
      <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></a>
    </div>
  )
}

export default Navbar;
