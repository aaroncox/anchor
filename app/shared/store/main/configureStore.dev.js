import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { electronEnhancer } from 'redux-electron-store';
import { createLogger } from 'redux-logger';
import rootReducer from '../../reducers';

const configureStore = (initialState?: counterStateType) => {
  // Redux Configuration
  const middleware = [];

  // Thunk Middleware
  middleware.push(thunk);

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  // Apply Middleware & Compose Enhancers
  const enhancer = compose(
    applyMiddleware(...middleware),
    electronEnhancer(true)
  );

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../../reducers', () =>
      store.replaceReducer(require('../../reducers'))); // eslint-disable-line global-require
  }

  return store;
};

export default { configureStore };
