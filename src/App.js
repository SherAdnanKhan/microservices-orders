import React from 'react';
import './App.css';
import LoginForm from './components/auth/loginForm';
import { Switch, Route, Redirect } from 'react-router-dom';
import RegisterForm from './components/auth/registerForm';

function App() {
  return (
    <Switch>
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/register' component={RegisterForm} />
      <Redirect exact from='/' to='/login' />
    </Switch>

  );
}

export default App;
