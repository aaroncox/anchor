/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

import AccountCreate from './containers/Account/Create';
import AccountImport from './containers/Account/Import';
import Manager from './containers/Manager';
import Welcome from './containers/Welcome';

export default () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Manager} />
      <Route path="/account/create" component={AccountCreate} />
      <Route path="/account/import" component={AccountImport} />
      <Route path="/welcome" component={Welcome} />
    </Switch>
  </HashRouter>
);
