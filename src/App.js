import React, { useEffect } from 'react';
import LoginForm from './components/auth/loginForm';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import RegisterForm from './components/auth/registerForm';
import Home from './components/home';
import ForgotPasswordForm from './components/auth/forgotPasswordForm';
import ProtectedRoute from './components/common/protectedRoute';
import ArtSelection from "./components/artSelection";
import Welcome from './components/welcome';
import Tutorial from './components/tutorial';
import { getCurrentUser } from './actions/authActions';
import StartFaves from './components/dashboard/startFavas';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from './store';
import { updateFeelColor } from './actions/colorActions';
import Call from './components/call';
import Notifications from './components/notifications';
import ViewPost from './components/dashboard/viewPost/viewPost';
import Main from './components/dashboard/Main';
import AddExibit from './components/dashboard/exhibition/addExibition';
import Profile from './components/dashboard/profile';
import NavBar from './components/dashboard/layout/navBar';
import GroupVideoCall from './components/video/groupVideo';
import AddVideoArtist from './components/video/addVideoArtist';
import Agreement from './components/auth/agreement';

const currentUser = getCurrentUser();

if (getCurrentUser()) {
  document.querySelector(`meta[name="theme-color"]`).setAttribute(`content`, currentUser?.feel?.color_code);
  store.dispatch(updateFeelColor(currentUser?.feel?.color_code));
}

function App() {
  const history = useHistory();

  useEffect(() => {
    let url1 = history.location.pathname.split('/')[2];
    let url2 = history.location.pathname.split('/')[1];
    if (url1) {
      document.title = `Meuzm: ${url1}`
    } else {
      document.title = `Meuzm: ${url2}`
    }
  }, [history]);

  return (
    <div className="app">
      <ToastContainer
        autoClose={5000}
        hideProgressBar={true}
      />

      <Switch>
        <Route exact path='/login' component={LoginForm} />
        <Route exact path='/forgot' component={ForgotPasswordForm} />
        <Route exact path='/register' component={RegisterForm} />
        <Route exact path='/agreement' component={Agreement} />
        <Route exact path="/viewpost/:id" component={ViewPost} />
        <ProtectedRoute exact path="/welcome" component={Welcome} />
        <ProtectedRoute exact path="/artselection" component={ArtSelection} />
        <ProtectedRoute exact path="/start-favas" component={StartFaves} />
        <ProtectedRoute path="/tutorial" component={Tutorial} />
        <ProtectedRoute exact path="/change-password" component={Main} />
        <ProtectedRoute exact path="/lobby" component={Main} />
        <ProtectedRoute exact path="/exhibition" component={AddExibit} />
        <ProtectedRoute exact path="/my-studio/profile/" component={Profile} />
        <ProtectedRoute exact path="/my-vaults" component={Main} />

        <ProtectedRoute exact path="/my-studio/fave" component={Main} />
        <ProtectedRoute exact path="/my-studio/fave-by" component={Main} />
        <ProtectedRoute exact path="/my-studio/fave-galleries/:id" component={Main} />
        <ProtectedRoute exact path="/my-studio/gallery-followers/:slug" component={Main} />
        <ProtectedRoute exact path="/my-studio/sprfvs/:slug" component={Main} />
        <ProtectedRoute exact path="/my-studio" component={Main} />

        <ProtectedRoute exact path="/studio/gallery-followers/:slug" component={Main} />
        <ProtectedRoute exact path="/studio/fave-galleries/:id" component={Main} />
        <ProtectedRoute exact path="/studio/sprfvs/:slug" component={Main} />
        <ProtectedRoute exact path="/studio/:slug" component={Main} />
        <ProtectedRoute exact path="/studio/fave" component={Main} />
        <ProtectedRoute exact path="/studio/fave-by" component={Main} />

        <ProtectedRoute exact path="/mz-flash/:slug" component={Main} />
        <ProtectedRoute exact path="/mz-flash-group" component={Main} />
        <ProtectedRoute exact path="/privacy" component={Main} />
        <ProtectedRoute exact path="/chat/:slug?" component={Main} />

        <ProtectedRoute exact path="/video-call/:room" component={GroupVideoCall} />
        <ProtectedRoute exact path="/video-call/add" component={AddVideoArtist} />
        <ProtectedRoute exact path="/group-chat" component={Main} />
        <ProtectedRoute exact path="/settings" component={NavBar} />
        <ProtectedRoute exact path="/feel-history" component={Main} />
        <Route exact path='/home' component={Home} />
        <Redirect exact from='/' to='/home' />
      </Switch>
      <Notifications />
      <Call />
    </div>
  );
};

export default App;
