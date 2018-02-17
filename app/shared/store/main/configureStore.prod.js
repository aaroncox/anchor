// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { electronEnhancer } from 'redux-electron-store';
import rootReducer from '../../reducers';

const enhancer = compose(
  applyMiddleware(thunk),
  electronEnhancer(true),
);

function configureStore(initialState?: counterStateType) {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore };
