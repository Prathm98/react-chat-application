import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyBAUs20gLeSPlEeCM0etyhh-urZj9wCQQs",
  authDomain: "react-slack-clone-6096b.firebaseapp.com",
  projectId: "react-slack-clone-6096b",
  storageBucket: "react-slack-clone-6096b.appspot.com",
  messagingSenderId: "112987856959",
  appId: "1:112987856959:web:1d8b6711c432a4094b188a",
  measurementId: "G-4TNN05YPN1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;
