import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {

  const [formData, setFormData] = useState({
    email: '', password: '', password2: ''
  });

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const { email, password, password2 } = formData;

  return (
    <Fragment>
      <div className="container text-center">
        <div className="row">
          <h3 className="blue-text darken-1"><i className="material-icons large">chat</i><br /> Chat App</h3>
        </div>
        <div className="row">
          <div className="col s3 m2"></div>
          <div className="col s6 m8 card register">            
            <h4>Register</h4>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input name="email" type="email" className="validate"
                  onChange={e => onChange(e)} value={email} />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">vpn_key</i>
                <input name="password" type="password" className="validate"
                  onChange={e => onChange(e)} value={password} />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">vpn_key</i>
                <input name="password2" type="password" className="validate"
                  onChange={e => onChange(e)} value={password2} />
                <label htmlFor="password2">Confirm Password</label>
              </div>
            </div>
            <div className="row">
              <a className="waves-effect waves-light btn">
                <i className="material-icons right">send</i>
                Submit
              </a>
            </div>
            <div className="row">
              Already have an account? <Link to="/login">Sign In</Link>
            </div>
          </div>
          <div className="col s3 m2"></div>
        </div>
      </div>
    </Fragment>
  );
}

export default Register;
