/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

import App from './containers/App';

import Anchor from './containers/Anchor';
import Manager from './containers/Manager';
import Tray from './containers/Tray';

export default () => (
  <App>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Tray} />
        <Route path="/anchor/:ops/:meta" component={Anchor} />
        <Route path="/manager" component={Manager} />
      </Switch>
    </HashRouter>
  </App>
);
