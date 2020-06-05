import React, { useEffect, useState } from 'react';
import LoginForm from './components/auth/loginForm';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import RegisterForm from './components/auth/registerForm';
import Home from './components/home';
import ForgotPasswordForm from './components/auth/forgotPasswordForm';
import ProtectedRoute from './components/common/protectedRoute';
import ArtSelection from "./components/artSelection";
import Welcome from './components/welcome';
import Dashboard from './components/dashboard/dashboard';
import history from "./components/common/history";
import Tutorial from './components/tutorial';
import io from 'socket.io-client';
import { getCurrentUser } from './actions/authActions';
import SocketContext from './context/socketContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateCounter } from './actions/userActions';
import { useDispatch } from 'react-redux';

function App() {
  const [socket, setSocket] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    let url1 = history.location.pathname.split('/')[2];
    let url2 = history.location.pathname.split('/')[1];
    if (url1) {
      document.title = `Meuzm: ${url1}`
    } else {
      document.title = `Meuzm: ${url2}`
    }
  }, []);

  useEffect(() => {
    if (!socket && getCurrentUser()) {
      setSocket(io.connect(process.env.REACT_APP_SOCKET_URL));
    }

    if (socket) {
      socket.emit('joinNotification', 'notify', () => {
        console.log("notification joined. ");
      });

      socket.on('notify', data => {
        const conversations = JSON.parse(localStorage.getItem('conversations'));
        const found = conversations.find(conversation => conversation.id === data.room);

        if (found && getCurrentUser().id !== data.user.id) {
          dispatch(updateCounter())
          toast(() => {
            return (
              <Link
                to={`/dashboard/chat/${data.user.slug}`}
                style={{ textDecoration: 'none', color: getCurrentUser().feel_color }}>
                You have new message from {data.user.username}
              </Link>
            )
          });
        }
      });
    }

    return () => {
      if (socket) {
        socket.emit('disconnect');
        setSocket('');
      }
    }
  }, [socket, dispatch])

  return (

    <SocketContext.Provider value={socket}>
      <ToastContainer autoClose={5000} />
      <Switch>
        <Route exact path='/login' component={LoginForm} />
        <Route exact path='/forgot' component={ForgotPasswordForm} />
        <Route exact path='/register' component={RegisterForm} />
        <ProtectedRoute exact path="/welcome" component={Welcome} />
        <ProtectedRoute exact path="/artselection" component={ArtSelection} />
        <ProtectedRoute path='/dashboard/:page?' component={Dashboard} />
        <ProtectedRoute path="/tutorial" component={Tutorial} />
        <Route exact path='/home' component={Home} />
        <Redirect exact from='/' to='/dashboard' />
      </Switch>
    </SocketContext.Provider>
  );
};

export default App;
