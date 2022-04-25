import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import upgradeFlow from './middleware/upgradeFlow';
import reducer from './reducers';

const isDev = window.location.host.includes('infuratest') || window.location.host.includes('localhost');

const enhancedCompose =
  isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

export default createStore(reducer, enhancedCompose(applyMiddleware(thunk, upgradeFlow)));
