import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserContext from '../../context/userContext';
import Main from './Main';

import Profile from './profile';
import NavBar from './layout/navBar';
import AddExibit from './exhibition/addExibition';
import VideoCall from '../video/VideoCall';
import AddVideoArtist from '../video/addVideoArtist';
import GroupVideoCall from "../video/groupVideo";
import PostView from "../common/postView";

const Dashboard = ({ user }) => {
  return (
    <UserContext.Provider value={user}>
      <Switch>
        <Route exact path="/dashboard/change-password" component={Main} />
        <Route exact path="/dashboard/lobby" component={Main} />
        <Route exact path="/dashboard/exhibition" component={AddExibit} />
        <Route exact path="/dashboard/my-studio/profile/:slug" component={Profile} />
        <Route exact path="/dashboard/my-studio/fave" component={Main} />
        <Route exact path="/dashboard/my-studio/fave-by" component={Main} />
        <Route exact path="/dashboard/my-studio/fave-galleries/:id" component={Main} />
        <Route exact path="/dashboard/my-studio/gallery-followers/:slug" component={Main} />
        <Route exact path="/dashboard/my-studio/sprfvs/:slug" component={Main} />
        <Route exact path="/dashboard/my-studio" component={Main} />
        <Route exact path="/dashboard/post/:slug" component={PostView} />
        <Route exact path="/dashboard/studio/gallery-followers/:slug" component={Main} />
        <Route exact path="/dashboard/studio/fave-galleries/:id" component={Main} />
        <Route exact path="/dashboard/studio/sprfvs/:slug" component={Main} />
        <Route exact path="/dashboard/studio/:slug" component={Main} />
        <Route exact path="/dashboard/studio/fave" component={Main} />
        <Route exact path="/dashboard/studio/fave-by" component={Main} />

        <Route exact path="/dashboard/mz-flash/:slug" component={Main} />
        <Route exact path="/dashboard/mz-flash-group" component={Main} />
        <Route exact path="/dashboard/viewpost/:id" component={Main} />
        <Route exact path="/dashboard/privacy" component={Main} />
        <Route exact path="/dashboard/chat/:slug" component={Main} />
        <Route exact path="/dashboard/video-call" component={VideoCall} />
        <Route exact path="/dashboard/video-call/group" component={GroupVideoCall} />
        <Route exact path="/dashboard/video-call/add" component={AddVideoArtist} />
        <Route exact path="/dashboard/group-chat" component={Main} />
        <Route exact path="/dashboard/conversations" component={Main} />
        <Route exact path="/dashboard/settings" component={NavBar} />
        <Route exact path="/dashboard/feel-history" component={Main} />
        <Redirect exact from="/dashboard" to="/dashboard/lobby" />
      </Switch>
    </UserContext.Provider>

  );
};

export default Dashboard;
