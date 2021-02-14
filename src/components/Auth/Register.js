import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from "../../firebase";
import LoadingSmall from '../layout/LoadingSmall';
import md5 from 'md5';

const Register = () => {

  const [formData, setFormData] = useState({
    name:'', email: '', password: '', password2: ''
  });
  const [errors, setErrors] = useState({type: 'danger', error: []});
  const [loading, setLoading] = useState(false);
  const [userRef, setUserRef] = useState(firebase.database().ref('users'));

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const { name, email, password, password2 } = formData;

  const onSubmit = async (e) => {
    
    e.preventDefault();
    setErrors({type:'danger', error:[]});
    setLoading(true);

    if(name === null || name === undefined || (name.trim()).length < 1 ||
      email === null || email === undefined || (email.trim()).length < 1 || 
      password === null || password === undefined || (password.trim()).length < 1 ||
      password2 === null || password2 === undefined || (password2.trim()).length < 1){
      setErrors({type: 'danger', error: ['All Fields are required!!!']});
    }else if ((password.trim()).length < 6) {
      setErrors({type: 'danger', error: ['Password should contain atleast 6 characters']});
    } else if((password.trim()) !== (password2.trim())){
      setErrors({type: 'danger', error: ['Password doesn\'t match']});
    }else{
      try {
        let userData = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await userData.user.updateProfile({
          displayName: name,
          photoURL: `http://gravatar.com/avatar/${md5(
            userData.user.email
          )}?d=identicon`
        });
        // console.log(userData);
        saveUser(userData.user);
        setErrors({type: 'success', error: ['User Registered Successfully']});
        setFormData({name: '', email: '', password: '', password2: ''});
      } catch (err) {
        console.error(err);
        setErrors({type: 'danger', error: [err.message]});      
      }
    }
    setLoading(false); 
  }

  const saveUser = user => {
    return userRef.child(user.uid).set({
      name: user.displayName,
      avatar: user.photoURL
    });
  }

  return (
    <Fragment>
      <div className="container text-center">
        <div className="row">
          <h4 className="teal-text">
            <i className="material-icons large">chat</i><br />Register for Chat App
          </h4>
        </div>
        <div className="row">
          <div className="col l4 m2 s1"></div>
          <div className="col l4 s10 m8 card register">
            <form>
              <div className="row">
                {errors.error.length > 0 && <div className={`error-${errors.type}`}>
                  {errors.error.map((err, index) => <div key={index}>{err}<br /></div>)}
                </div>}
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">person</i>
                  <input name="name" id="name" type="text" className="validate"
                    onChange={e => onChange(e)} value={name} required />
                  <label htmlFor="name">Name</label>
                </div>

                <div className="input-field col s12">
                  <i className="material-icons prefix">email</i>
                  <input name="email" id="email" type="email" className="validate"
                    onChange={e => onChange(e)} value={email} required />
                  <label htmlFor="email">Email</label>
                </div>
              
                <div className="input-field col s12">
                  <i className="material-icons prefix">vpn_key</i>
                  <input name="password" id="password" type="password" className="validate"
                    onChange={e => onChange(e)} value={password} required />
                  <label htmlFor="password">Password</label>
                </div>
              
                <div className="input-field col s12">
                  <i className="material-icons prefix">vpn_key</i>
                  <input name="password2" id="password2" type="password" className="validate"
                    onChange={e => onChange(e)} value={password2} required />
                  <label htmlFor="password2">Confirm Password</label>
                </div>
              </div>
              <div className="container">
                {loading ? <LoadingSmall />:
                <button className="waves-effect waves-light btn" onClick={e => onSubmit(e)}>
                  <i className="material-icons right">send</i>
                  Submit
                </button>}
              </div>              
            </form>
            <div className="row"><br />
              Already have an account? <Link to="/login">Sign In</Link>
            </div>
          </div>
          <div className="col l4 m2 s1"></div>
        </div>
      </div>
    </Fragment>
  );
}

export default Register;
