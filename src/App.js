import React, { useEffect } from 'react';
import LoginForm from './components/auth/loginForm';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import RegisterForm from './components/auth/registerForm';
import Home from './components/home';
import ForgotPasswordForm from './components/auth/forgotPasswordForm';
import ProtectedRoute from './components/common/protectedRoute';
import ArtSelection from "./components/artSelection";
import Welcome from './components/welcome';
import Dashboard from './components/dashboard/dashboard';
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
        <Route exact path="/dashboard/viewpost/:id" component={ViewPost} />
        <ProtectedRoute exact path="/welcome" component={Welcome} />
        <ProtectedRoute exact path="/artselection" component={ArtSelection} />
        <ProtectedRoute exact path="/start-favas" component={StartFaves} />
        <ProtectedRoute path="/tutorial" component={Tutorial} />
        <ProtectedRoute path='/dashboard/:page?' component={Dashboard} />
        <Route exact path='/home' component={Home} />
        <Redirect exact from='/' to='/home' />
      </Switch>
      <Notifications />
      <Call />
    </div>
  );
};

export default App;
