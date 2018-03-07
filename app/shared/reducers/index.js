// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import settings from './settings';
import wallet from './wallet';

const rootReducer = combineReducers({
  router,
  settings,
  wallet
});

export default rootReducer;
