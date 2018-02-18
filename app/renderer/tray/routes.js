/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

import TrayContainer from './containers/Tray';

export default () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={TrayContainer} />
    </Switch>
  </HashRouter>
);
