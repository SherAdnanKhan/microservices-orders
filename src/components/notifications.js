import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getAuthToken, getCurrentUser, logout } from '../actions/authActions';
import { updateFeelColor } from '../actions/colorActions';
import { updateConversationUnreadCount } from '../actions/conversationActions';
import { getOnlineUsers } from '../actions/userActions';
import socket from '../services/socketService';
import { playNotificationSound } from '../utils/helperFunctions';
import { useWindowUnloadEffect } from './common/useWindowUnloadEffect';
import {
  userKey,
  POST_COMMENT,
  FEED_COMMENT,
  FEED_STROKE,
  FEED_UNSTROKE,
  POST_STROKE,
  POST_UNSTROKE
} from '../constants/keys';

const currentUser = getCurrentUser();

const Notifications = () => {
  const dispatch = useDispatch();

  const cleanupEvents = () => {
    socket.off('onlineUsers');
    socket.off('notifyColrChange');
    socket.off('reciveUserNotifications');
    socket.off('notify');
    socket.off('logout-called');

    socket.emit('userLeft', currentUser);
    socket.disconnect();
    socket.close();
  };

  useWindowUnloadEffect(() => {
    cleanupEvents();
  }, true);

  useEffect(() => {
    if (currentUser) {
      socket.emit('joinUser', currentUser, getAuthToken());

      socket.on('notifyColrChange', (user) => {
        document.querySelector(`meta[name="theme-color"]`).setAttribute(`content`, user.feel.color_code);
        localStorage.setItem(userKey, JSON.stringify(user));
        dispatch(updateFeelColor(user.feel.color_code))
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
              <a
                href={`/dashboard/chat/${data.message.conversation_id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: currentUser.feel.color_code }}>
                You have new message from {data.message.user.username}
              </a>
            )
          });
          dispatch(updateConversationUnreadCount(data.message));
        }
      });

      socket.on('onlineUsers', data => {
        dispatch(getOnlineUsers(data));
      });

      socket.on('logout-called', data => {
        const token = getAuthToken();
        if (!token || data.token === token) {
          logout();
        }
      })

      socket.on('reconnect', () => {
        socket.emit('joinUser', currentUser, getAuthToken());
      })
    }
  }, [dispatch]);

  return (
    null
  );
};

export default Notifications;
