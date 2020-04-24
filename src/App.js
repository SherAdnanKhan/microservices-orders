import React from 'react';
import LoginForm from './components/auth/loginForm';
import { Switch, Route, Redirect } from 'react-router-dom';
import RegisterForm from './components/auth/registerForm';
import Home from './components/home';

function App() {
  return (
    <Switch>
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/register' component={RegisterForm} />
      <Route exact path='/home' component={Home} />
      <Redirect exact from='/' to='/home' />
    </Switch>
  );
}

export default App;
