import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { electronEnhancer } from 'redux-electron-store';
import { persistStore, persistReducer } from 'redux-persist';
import createIpc from 'redux-electron-ipc';
import thunk from 'redux-thunk';

import rootReducer from '../../reducers';
import persistConfig from '../shared/persist';
import logger from '../shared/logger';

const history = createHashHistory();

const configureStore = (initialState) => {
  const middleware = [];

  middleware.push(thunk);

  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  const router = routerMiddleware(history);
  middleware.push(router);

  function walletKeySetFailAction(event, account, keyType, errorCode) {
    return {
      type: 'IPC_WALLET_KEY_SET_FAIL',
      payload: {
        account,
        keyType,
        errorCode
      }
    };
  }
  function walletKeySetSuccessAction(event, account, keyType) {
    return {
      type: 'IPC_WALLET_KEY_SET_SUCCESS',
      payload: {
        account,
        keyType
      }
    };
  }
  const ipc = createIpc({
    walletKeySetFailAction,
    walletKeySetSuccessAction
  });
  middleware.push(ipc);

  const actionCreators = { ...routerActions };

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionCreators,
    })
    : compose;
  /* eslint-enable no-underscore-dangle */

  const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    electronEnhancer({
      dispatchProxy: a => store.dispatch(a),
    })
  );

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, initialState, enhancer);
  const persistor = persistStore(store);

  if (module.hot) {
    module.hot.accept('../../reducers', () =>
      store.replaceReducer(require('../../reducers'))); // eslint-disable-line global-require
  }

  return { store, persistor };
};

export default { configureStore, history };
