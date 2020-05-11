import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserContext from '../../context/userContext';
import Main from './Main';

const Dashboard = ({ user }) => {
  return (
    <UserContext.Provider value={user}>
      <Switch>
        <Route exact path="/dashboard/change-password" component={Main} />
        <Route exact path="/dashboard/lobby" component={Main} />
        <Route exact path="/dashboard/exibition/new" component={Main} />
        <Redirect exact from="/dashboard" to="/dashboard/lobby" />
      </Switch>
    </UserContext.Provider>

  );
};

export default Dashboard;
