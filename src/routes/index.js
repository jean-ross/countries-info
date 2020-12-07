import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import CountryForm from '../pages/CountryForm';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/country/:name" component={CountryForm} />
  </Switch>
);

export default Routes;