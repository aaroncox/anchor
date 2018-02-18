/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

import App from './containers/App';

import Anchor from './containers/Anchor';

export default () => (
  <App>
    <HashRouter>
      <Switch>
        <Route path="/:ops/:meta" component={Anchor} />
      </Switch>
    </HashRouter>
  </App>
);
