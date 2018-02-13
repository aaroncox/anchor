import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import TrayMenu from './containers/TrayMenu';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

const store = configureStore();

render(
  <AppContainer>
    <TrayMenu store={store} history={history} />
  </AppContainer>,
  document.getElementById('tray-menu')
);

if (module.hot) {
  module.hot.accept('./containers/TrayMenu', () => {
    const NextRoot = require('./containers/TrayMenu'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('tray-menu')
    );
  });
}
