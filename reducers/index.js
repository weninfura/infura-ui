import { combineReducers } from 'redux';
import auth from './auth';
import project from './project';
import ui from './ui';
import subscription from './subscription';
import dashboard from './dashboard';
import checkout from './checkout';

const reducer = combineReducers({
  auth,
  project,
  ui,
  subscription,
  dashboard,
  checkout,
});

export default reducer;
