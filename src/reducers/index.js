import {combineReducers} from 'redux';
import user from './user';
import channels from './channels';

export default combineReducers({
  user, channels
});