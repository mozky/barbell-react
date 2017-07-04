import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

export const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

export const PrivateRoute = ({ component, redirectTo, isLoggedIn, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return isLoggedIn ? (
        renderMergedProps(component, routeProps, rest)
      ) : (
        <Redirect to={{
          pathname: redirectTo,
          state: { referrer: routeProps.location }
        }}/>
      );
    }}/>
  );
};

export const AdminRoute = ({ component, redirectTo, isLoggedIn, isAdmin, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return (isLoggedIn && isAdmin) ? (
        renderMergedProps(component, routeProps, rest)
      ) : (
        <Redirect to={{
          pathname: redirectTo,
          state: { referrer: routeProps.location }
        }}/>
      );
    }}/>
  );
};
