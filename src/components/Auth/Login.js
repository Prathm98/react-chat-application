import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from "../../firebase";
import LoadingSmall from '../layout/LoadingSmall';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Login = ({ user }) => {
  const [formData, setFormData] = useState({
    email: '', password: ''
  });
  const [errors, setErrors] = useState({type: 'danger', error: []});
  const [loading, setLoading] = useState(false);  

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const { email, password } = formData;

  const onSubmit = async (e) => {
    
    e.preventDefault();
    setErrors({type:'danger', error:[]});
    setLoading(true);

    if(email === null || email === undefined || (email.trim()).length < 1 || 
      password === null || password === undefined || (password.trim()).length < 1){
      setErrors({type: 'danger', error: ['All Fields are required!!!']});
    }else if ((password.trim()).length < 6) {
      setErrors({type: 'danger', error: ['Password should contain atleast 6 characters']});
    } else{
      try {
        let userData = await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log(userData);
        // setFormData({email: '', password: ''});
      } catch (err) {
        console.error(err);
        setErrors({type: 'danger', error: [err.message]});      
      }
    }
    // setLoading(false);
  }
  
  if(!user.loading && user.currentUser){
    return <Redirect to="/home" />;   
  }
  

  return (
    user.loading ? <Spinner /> :<Fragment>
      <div className="container text-center">
        <div className="row">
          <h4 className="teal-text">
            <i className="material-icons large">whatshot</i><br />Login for Chat App
          </h4>
        </div>
        <div className="row">
          <div className="col l3 m2 s1"></div>
          <div className="col l6 s10 m8 card register">
            <form>
              <div className="row">
                {errors.error.length > 0 && <div className={`error-${errors.type}`}>
                  {errors.error.map((err, index) => <div key={index}>{err}<br /></div>)}
                </div>}
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">email</i>
                  <input name="email" id="email" type="email" className="validate"
                    onChange={e => {onChange(e)}} value={email} required />
                  <label htmlFor="email">Email</label>
                </div>
              
                <div className="input-field col s12">
                  <i className="material-icons prefix">vpn_key</i>
                  <input name="password" id="password" type="password" className="validate"
                    onChange={e => {onChange(e)}} value={password} required />
                  <label htmlFor="password">Password</label>
                </div>              
              </div>
              <div className="container">
                {loading ? <LoadingSmall />:
                <button type="submit" className="waves-effect waves-light btn" onClick={e => {onSubmit(e)}}>
                  <i className="material-icons right">send</i>
                  Login
                </button>}
              </div>              
            </form>
            <div className="row"><br />
              Don't have an account? <Link to="/register">Sign Up</Link>
            </div>
          </div>
          <div className="col l3 m2 s1"></div>
        </div>
      </div>
    </Fragment>
  );
}

Login.prototype = {
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {})(Login);
