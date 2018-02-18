// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { electronEnhancer } from 'redux-electron-store';
import rootReducer from '../../reducers';

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(thunk),
    electronEnhancer({
      dispatchProxy: a => store.dispatch(a)
    })
  );
  const store = createStore(rootReducer, initialState, enhancer);
  return store;
}

export default { configureStore };
