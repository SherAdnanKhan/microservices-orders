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
import { userKey } from './constants/keys';
import store from './store';
import { updateFeelColor } from './actions/colorActions';
import { playNotificationSound } from './utils/helperFunctions';
import socket from './services/socketService';

if (getCurrentUser()) {
  store.dispatch(updateFeelColor(getCurrentUser().feel_color));
}

function App() {
  // const [socket, setSocket] = useState('');
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
        console.log(user.feel_color)
        localStorage.setItem(userKey, JSON.stringify(user));
        dispatch(updateFeelColor(user.feel_color))
      })

      socket.on('notify', data => {
        const activeConversation = JSON.parse(localStorage.getItem('activeConversation'));
        if (activeConversation !== data.room) {
          playNotificationSound();
          toast(() => {
            return (
              <Link
                to={`/dashboard/chat/${data.user.slug}`}
                style={{ textDecoration: 'none', color: currentUser.feel_color }}>
                You have new message from {data.user.username}
              </Link>
            )
          });
          dispatch(updateCounter());
          dispatch(updateConversationUnreadCount(data));
        }
      });
    }

    return () => {
      if (socket) {
        socket.emit('disconnect');
        socket.emit('userLeft', currentUser);
      }
    }
  }, [dispatch, currentUser])

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
        <Redirect exact from='/' to='/home' />
      </Switch>
    </SocketContext.Provider>
  );
};

export default App;
