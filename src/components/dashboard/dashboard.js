import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UserContext from '../../context/userContext';
import Main from './Main';
import Profile from './profile';
import NavBar from './layout/navBar';
import AddExibit from './exhibition/addExibition';
import AddVideoArtist from '../video/addVideoArtist';
import GroupVideoCall from "../video/groupVideo";
import MyVault from './vault/myVault';

const Dashboard = ({ user }) => {
  return (
    <UserContext.Provider value={user}>
      <Switch>
        <Route exact path="/change-password" component={Main} />
        <Route exact path="/lobby" component={Main} />
        <Route exact path="/exhibition" component={AddExibit} />
        <Route exact path="/my-studio/profile/" component={Profile} />
        <Route exact path="/my-studio/vault/" component={MyVault} />
        <Route exact path="/my-studio/fave" component={Main} />
        <Route exact path="/my-studio/fave-by" component={Main} />
        <Route exact path="/my-studio/fave-galleries/:id" component={Main} />
        <Route exact path="/my-studio/gallery-followers/:slug" component={Main} />
        <Route exact path="/my-studio/sprfvs/:slug" component={Main} />
        <Route exact path="/my-studio" component={Main} />
        <Route exact path="/studio/gallery-followers/:slug" component={Main} />
        <Route exact path="/studio/fave-galleries/:id" component={Main} />
        <Route exact path="/studio/sprfvs/:slug" component={Main} />
        <Route exact path="/studio/:slug" component={Main} />
        <Route exact path="/studio/fave" component={Main} />
        <Route exact path="/studio/fave-by" component={Main} />
        <Route exact path="/mz-flash/:slug" component={Main} />
        <Route exact path="/mz-flash-group" component={Main} />
        <Route exact path="/privacy" component={Main} />
        <Route exact path="/chat/:slug?" component={Main} />
        <Route exact path="/video-call/:room" component={GroupVideoCall} />
        <Route exact path="/video-call/add" component={AddVideoArtist} />
        <Route exact path="/group-chat" component={Main} />
        <Route exact path="/settings" component={NavBar} />
        <Route exact path="/feel-history" component={Main} />
      </Switch>
    </UserContext.Provider>

  );
};

export default Dashboard;
