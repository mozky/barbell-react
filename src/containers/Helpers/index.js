import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest)
  return (
    React.createElement(component, finalProps)
  )
}

// Helper route wrapper to pass props to component
export const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest)
    }}/>
  )
}

// Protects the route by allowing only logged in users
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
      )
    }}/>
  )
}

// Routes that user needs to have administrator status in order to see, this doesn't
// validate that the user is logged in, so must be used with caution
export const AdminRoute = ({ component, redirectTo, isAdmin, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return isAdmin ? (
        renderMergedProps(component, routeProps, rest)
      ) : (
        <Redirect to={{
          pathname: redirectTo,
          state: { referrer: routeProps.location }
        }}/>
      )
    }}/>
  )
}
