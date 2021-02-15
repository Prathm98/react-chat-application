import {combineReducers} from 'redux';
import user from './user';
import channels from './channels';
import messages from './messages';

export default combineReducers({
  user, channels, messages
});