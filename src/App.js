import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { connect } from 'react-redux';
import { setUser } from './actions/user';
import { useEffect } from 'react';
import firebase from './firebase';

function App({ setUser }) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        setUser(user);
      }
    });
  }, []);

  return (    
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </div>    
  );
}

export default connect(null, {
  setUser
})(App);
