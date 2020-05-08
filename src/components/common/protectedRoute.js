import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getCurrentUser } from '../../actions/authActions'

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        return !getCurrentUser()
          ? <Redirect to="/login" /> : Component
            ? <Component {...props} user={getCurrentUser().user} avatars={getCurrentUser().avatars} /> : render(props)
      }}
    />
  )
}

export default ProtectedRoute
