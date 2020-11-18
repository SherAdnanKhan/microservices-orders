import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAuthToken, getCurrentUser, logout } from '../actions/authActions';
import { updateFeelColor } from '../actions/colorActions';
import { updateConversationUnreadCount } from '../actions/conversationActions';
import { addOnlineUser, removeOnlineUser, setOnlineUsers } from '../actions/onlineUserActions';
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
import { updateUnreadConversations } from '../actions/lobbyActions';

const currentUser = getCurrentUser();

const Notifications = () => {
  const dispatch = useDispatch();
  const { conversation } = useSelector(state => state.conversation);
  const [hasRendered, setHasRendered] = useState(false);
  const conversationRef = useRef();

  useEffect(() => {
    conversationRef.current = conversation;
  }, [conversation]);

  const cleanupEvents = () => {
    socket.off('onlineUser');
    socket.off('offlineUser');
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
      if (!hasRendered) {
        socket.emit('joinUser', currentUser, getAuthToken(), users => {
          dispatch(setOnlineUsers(users));
        });

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
          if (conversationRef.current?.id !== data.message.conversation_id) {
            playNotificationSound();
            toast(() => {
              return (
                <a
                  href={`/chat/${data.message.conversation_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: currentUser.feel.color_code }}>
                  You have new message from {data.message.user.username}
                </a>
              )
            });
            dispatch(updateConversationUnreadCount(data.message));
            dispatch(updateUnreadConversations(data.message.conversation_id));
          }
        });

        socket.on('onlineUser', user => {
          dispatch(addOnlineUser(user));
        });

        socket.on('offlineUser', user => {
          dispatch(removeOnlineUser(user));
        });

        socket.on('logout-called', data => {
          const token = getAuthToken();
          if (!token || data.token === token) {
            logout();
          }
        })

        socket.on('reconnect', () => {
          socket.emit('joinUser', currentUser, getAuthToken(), users => {
            dispatch(setOnlineUsers(users));
          });
        })

        setHasRendered(true);
      }
    }
  }, [dispatch, hasRendered, conversation]);

  return (
    null
  );
};

export default Notifications;
