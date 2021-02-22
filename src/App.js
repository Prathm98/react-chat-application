import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { connect } from 'react-redux';
import { setUser, clearUser } from './actions/user';
import { useEffect } from 'react';
import firebase from './firebase';
import Home from './components/Home';
import PrivateRoute from './components/routing/PrivateRoute';
import PropTypes from 'prop-types';

function App({ setUser, clearUser }) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        setUser(user);
      }else{
        clearUser();
      }
    });
  }, []);

  return (    
    <div className="App">
      <Router>
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />          
          <PrivateRoute path="/" component={Home} />
          <Route component={Login} />
        </Switch>
      </Router>
    </div>    
  );
}

App.prototype = {
  setUser: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired
};

export default connect(null, {
  setUser, clearUser
})(App);
