import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from '../../shared/store/renderer/configureStore';
import '../../shared/app.global.css';

const store = configureStore();
const doc = document.getElementById('root');

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  doc
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      doc
    );
  });
}
