import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserContext from '../../context/userContext';
import Main from './Main';
import addExibition from "./addExibition";
import StartFaves from "./startFavas";


const Dashboard = ({ user }) => {
  return (
    <UserContext.Provider value={user}>
      <Switch>
        <Route exact path="/dashboard/change-password" component={Main} />
        <Route exact path="/dashboard/lobby" component={Main} />
        <Route exact path="/dashboard/exhibition/:id" component={addExibition} />
        <Route exact path="/dashboard/start-favas" component={StartFaves} />
        <Route exact path="/dashboard/my-studio" component={Main} />
        <Route exact path="/dashboard/studio/:slug" component={Main} />
        <Route exact path="/dashboard/faving" component={Main} />
        <Route exact path="/dashboard/faving/:name" component={Main} />
        <Route exact path="/dashboard/my-studio/profile" component={Main} />
        <Route exact path="/dashboard/mz-flash" component={Main} />
        <Redirect exact from="/dashboard" to="/dashboard/lobby" />
      </Switch>
    </UserContext.Provider>

  );
};

export default Dashboard;
