import React from 'react';
import LoginForm from './components/auth/loginForm';
import { Switch, Route, Redirect } from 'react-router-dom';
import RegisterForm from './components/auth/registerForm';
import Home from './components/home';
import ForgotPasswordForm from './components/auth/forgotPasswordForm';
import ProtectedRoute from './components/common/protectedRoute';
import ArtSelection from "./components/artSelection";
import Ind from './components/ind';
import Dashboard from './components/dashboard/dashboard';

function App() {
  return (
    <Switch>
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/forgot' component={ForgotPasswordForm} />
      <Route exact path='/register' component={RegisterForm} />
      <ProtectedRoute exact path="/welcome" component={Ind} />
      <ProtectedRoute exact path="/artselection" component={ArtSelection} />
      <ProtectedRoute path='/dashboard/:page?' component={Dashboard} />
      <Route exact path='/home' component={Home} />
      <Redirect exact from='/' to='/home' />
    </Switch>
  );
}

export default App;
