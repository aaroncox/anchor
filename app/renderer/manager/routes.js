/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

import App from './containers/App';

import Manager from './containers/Manager';

export default () => (
  <App>
    <HashRouter>
      <Switch>
        <Route path="/" component={Manager} />
      </Switch>
    </HashRouter>
  </App>
);
