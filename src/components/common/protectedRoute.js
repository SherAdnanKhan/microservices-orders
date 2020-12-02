import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from '../../actions/authActions';
import UserContext from '../../context/userContext';

const ProtectedRoute = ({
  path, component: Component, render, ...rest
}) => {
  const user = getCurrentUser();
  return (
    <UserContext.Provider value={user}>
      <Route
        path={path}
        {...rest}
        render={props => (
          !user
            ? <Redirect to="/login" />
            : !user.email_verified_at
              ? <Redirect to="/verification" />
              : Component
                ? <Component {...props} user={getCurrentUser()} />
                : render(props)
        )}
      />
    </UserContext.Provider>
  );
}

export default ProtectedRoute;
