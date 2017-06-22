import React from 'react';
import { Route, Switch } from 'react-router';
import FilterableTable from './containers/FilterableTable';
import Login from './components/Login';
import About from './components/About';
import Test from './components/Test';

export const LoggedInRoutes = (
    <Switch>
        <Route exact path="/" component={FilterableTable} />
        <Route path="/about" component={About} />
    </Switch>
);

export const LoggedOutRoutes = (
    <Switch>
        <Route exact path="/" component={Test} />
        <Route path="/login" component={Login} />
        <Route path="/about" component={About} />
    </Switch>
);
