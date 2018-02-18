// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { electronEnhancer } from 'redux-electron-store';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../../reducers';

const history = createBrowserHistory();
const router = routerMiddleware(history);

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(thunk, router),
    electronEnhancer({
      dispatchProxy: a => store.dispatch(a),
    }),
  );
  const store = createStore(rootReducer, initialState, enhancer);
  return store;
}

export default { configureStore, history };
