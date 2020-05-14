import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserContext from '../../context/userContext';
import Main from './Main';
import addExibition from "./addExibition";

const Dashboard = ({ user }) => {
  return (
    <UserContext.Provider value={user}>
      <Switch>
        <Route exact path="/dashboard/change-password" component={Main} />
        <Route exact path="/dashboard/lobby" component={Main} />
        <Route exact path="/dashboard/exhibition/new" component={addExibition} />
        <Route exact path="/dashboard/my-studio" component={Main} />
        <Redirect exact from="/dashboard" to="/dashboard/lobby" />
      </Switch>
    </UserContext.Provider>

  );
};

export default Dashboard;
