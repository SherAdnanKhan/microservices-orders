import React, { useEffect } from 'react';
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
import { getCurrentUser } from './actions/authActions';
import SocketContext from './context/socketContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateCounter } from './actions/userActions';
import { useDispatch } from 'react-redux';
import { updateConversationUnreadCount } from './actions/conversationActions';

import store from './store';
import { updateFeelColor } from './actions/colorActions';
import { playNotificationSound } from './utils/helperFunctions';
import socket from './services/socketService';

import {
  userKey,
  POST_COMMENT,
  FEED_COMMENT,
  FEED_STROKE,
  FEED_UNSTROKE,
  POST_STROKE,
  POST_UNSTROKE
} from './constants/keys';

if (getCurrentUser()) {
  const user = getCurrentUser();
  store.dispatch(updateFeelColor(user.feel ? user.feel.color : user.feel_color));
}

function App() {
  const dispatch = useDispatch();
  const currentUser = getCurrentUser();

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
    if (currentUser) {
      socket.emit('joinUser', currentUser);

      socket.on('notifyColrChange', (user) => {
        console.log(user)
        localStorage.setItem(userKey, JSON.stringify(user));
        dispatch(updateFeelColor(user.feel ? user.feel.color : user.feel_color))
      });

      socket.on('reciveUserNotifications', (data, type) => {
        switch (type) {
          case POST_COMMENT:
            toast(`${data.sender.username} has commented on your post`);
            break;
          case FEED_COMMENT:
            toast(`${data.sender.username} has commented on your feed`);
            break;
          case FEED_STROKE:
            toast(`${data.sender.username} liked your feed`);
            break;
          case FEED_UNSTROKE:
            toast(`${data.sender.username} disliked your feed`);
            break;
          case POST_STROKE:
            toast(`${data.sender.username} liked your post`);
            break;
          case POST_UNSTROKE:
            toast(`${data.sender.username} disliked your post`);
            break;
          default:
            break;
        }
      });

      socket.on('notify', data => {
        const activeConversation = JSON.parse(localStorage.getItem('activeConversation'));
        if (activeConversation !== data.message.conversation_id) {
          playNotificationSound();
          toast(() => {
            return (
              <Link
                to={`/dashboard/chat/${data.message.user.slug}`}
                style={{ textDecoration: 'none', color: currentUser.feel_color }}>
                You have new message from {data.message.user.username}
              </Link>
            )
          });
          dispatch(updateCounter());
          dispatch(updateConversationUnreadCount(data.message));
        }
      });
    }

    return () => {
      if (socket) {
        socket.emit('disconnect');
        socket.emit('userLeft', currentUser);
        socket.disconnect();
        socket.close();
      }
    }
  }, [dispatch, currentUser])

  return (
    <SocketContext.Provider value={socket}>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={true}
      />
      <Switch>
        <Route exact path='/login' component={LoginForm} />
        <Route exact path='/forgot' component={ForgotPasswordForm} />
        <Route exact path='/register' component={RegisterForm} />
        <ProtectedRoute exact path="/welcome" component={Welcome} />
        <ProtectedRoute exact path="/artselection" component={ArtSelection} />
        <ProtectedRoute path='/dashboard/:page?' component={Dashboard} />
        <ProtectedRoute path="/tutorial" component={Tutorial} />
        <Route exact path='/home' component={Home} />
        <Redirect exact from='/' to='/home' />
      </Switch>
    </SocketContext.Provider>
  );
};

export default App;
