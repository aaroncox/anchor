/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

import App from './containers/App';

import TrayContainer from './containers/Tray';

export default () => (
  <App>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={TrayContainer} />
      </Switch>
    </HashRouter>
  </App>
);
