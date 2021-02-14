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
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/home" component={Home} />
        </Switch>
      </Router>
    </div>    
  );
}

export default connect(null, {
  setUser
})(App);
