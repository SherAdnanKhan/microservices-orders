import React, { useEffect } from 'react';
import LoginForm from './components/auth/loginForm';
import { Switch, Route, Redirect } from 'react-router-dom';
import RegisterForm from './components/auth/registerForm';
import Home from './components/home';
import ForgotPasswordForm from './components/auth/forgotPasswordForm';
import ProtectedRoute from './components/common/protectedRoute';
import ArtSelection from "./components/artSelection";
import Welcome from './components/welcome';
import Dashboard from './components/dashboard/dashboard';
import history from "./components/common/history";
import Tutorial from './components/tutorial';

function App() {
  useEffect(() => {
    let url1 = history.location.pathname.split('/')[2];
    let url2 = history.location.pathname.split('/')[1];
    if (url1) {
      document.title = `Meuzm: ${url1}`
    } else {
      document.title = `Meuzm: ${url2}`
    }

  }, []);
  return (
    <Switch>
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/forgot' component={ForgotPasswordForm} />
      <Route exact path='/register' component={RegisterForm} />
      <ProtectedRoute exact path="/welcome" component={Welcome} />
      <ProtectedRoute exact path="/artselection" component={ArtSelection} />
      <ProtectedRoute path='/dashboard/:page?' component={Dashboard} />
      <Route path="/tutorial" component={Tutorial} />
      <Route exact path='/home' component={Home} />
      <Redirect exact from='/' to='/home' />
    </Switch>
  );
}

export default App;
