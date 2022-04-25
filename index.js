import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Cookies from 'js-cookie';
import './sass/index.css';
import queryString from 'query-string';
import { has } from 'lodash';
import { setUserID, getCurrentUser, verifyLoginChallenge, logout } from './actions/auth';
import store from './store';

const App = process.env.REACT_APP_STAGE !== 'admin' ? require('./AdminApp').default : require('./App').default;

const userid = Cookies.get('USER_ID');
const parsedParams = queryString.parse(window.location.search);

if (has(parsedParams, 'login_challenge')) {
  store.dispatch(verifyLoginChallenge(parsedParams.login_challenge));
} else if (/(forgotverify)|(verify)/.test(window.location.pathname)) {
  store.dispatch(logout());
} else if (process.env.REACT_APP_STAGE !== 'admin' && typeof userid !== 'undefined') {
  store.dispatch(setUserID(userid));
  store.dispatch(getCurrentUser());
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
