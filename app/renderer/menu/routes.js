/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

import MenuContainer from './containers/Menu';

export default () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={MenuContainer} />
    </Switch>
  </HashRouter>
);
