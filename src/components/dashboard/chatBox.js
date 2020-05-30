import React, { useState, useEffect, useContext } from 'react';
import $ from 'jquery';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getConversation, updateConversation, clearConversation } from '../../actions/conversationActions';
import io from 'socket.io-client';
import Avatar from '../common/avatar';
import UserContext from '../../context/userContext';
// import { UPDATE_CONVERSATION } from '../../constants/actionTypes';
//import { useWindowUnloadEffect } from '../common/useWindowUnloadEffect';

const ChatBox = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { conversation, messages, user } = useSelector(state => state.conversation);
  const currentUser = useContext(UserContext);

  const url = "http://184.169.228.69:8080/";
  const [socket, setSocket] = useState('');

  // const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [joined, setJoined] = useState(false);
  const { params: { slug } } = useRouteMatch();

  useEffect(() => {
    if (slug) {
      dispatch(getConversation(slug));
    }
  }, [slug, dispatch]);

  useEffect(() => {
    if (!socket) {
      setSocket(io.connect(url));
    }

    if (socket) {
      if (conversation) {
        socket.emit('join', { room: conversation.id }, () => {
          console.log(`Group with id ${conversation.id}  joined `);
        });

        socket.on('recieveMessage', (data) => {
          dispatch(updateConversation(data));
        })
      }
    }

    return () => {
      if (socket && conversation) {
        socket.emit('leave', { room: conversation.id });
        socket.emit('disconnect');
        setSocket('');
        dispatch(clearConversation());
        setJoined(false);
      }
    }
  }, [socket, url, conversation, dispatch, joined]);


  const handleEnter = e => {
    if (e.keyCode === 13) {

      if (conversation) {
        const data = {
          message: e.target.value,
          user: currentUser,
          room: conversation.id
        };

        socket.emit('sendMessage', data, () => {
          setMessage('');
        });
      }


      $('.chat-container').stop().animate({
        scrollTop: $('.chat-container')[0].scrollHeight
      }, 'slow');
    }
  }

  return (
    <div className="chat-box">
      <div className="chat-header">
        <i
          className="fa fa-arrow-left clickable"
          onClick={() => history.replace(`/dashboard/studio/${slug}`)}
        />

        {user && <Avatar avatars={user.avatars} feelColor={user.feel_color} />}

        <div className="user-Status">
          {user && <p>{user.username}</p>}
          <span>Time Ago Active</span>
        </div>
        <div className="call-btn">
          <button>video Call</button>
          <button>Draw</button>
        </div>
      </div>
      <div className="chat-container">
        <div className="chat-uesr">
          {user && <Avatar avatars={user.avatars} feelColor={user.feel_color} />}
          <div className="chat-uesr-name">
            <p>	You are now Strqing with </p>
            {user && <span>{user.username}</span>}
          </div>
        </div>

        {/* {messages.map((msg, index) => (
          <div key={index} className="message-row group">
            <div className="outgoing">
              {msg}
            </div>
          </div>
        ))} */}

        {messages &&
          messages.map((data, index) => (
            <div key={index}>
              {data.user.id === currentUser.id
                ? (
                  <div
                    className="message-row group"
                  >
                    <div className="outgoing">
                      <div className="send-icon">
                        <img alt="" src={`/assets/images/${currentUser.feel_color}.png`} />
                      </div>
                      <p>{data.message}</p>
                    </div>
                  </div>
                ) : (
                  <div className="message-row group">
                    <div className="incoming">
                      <Avatar avatars={data.user.avatars} />
                      <p>{data.message}</p>
                    </div>
                  </div>
                )
              }
            </div>
          ))
        }
      </div>
      <div className="message-input">
        <i className="fa fa-plus add-items-btn" />
        <input
          autoFocus
          placeholder="Type a message"
          type="text"
          name="message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyUp={handleEnter}
        />
        <button>Post</button>
      </div>

      <div className="add-img-vid-box">
        <i className="fa fa-times close-add-box" />
        <div>
          <img alt="" src="/assets/images/plus.png" />
            Add Image
          </div>
        <div>
          <img alt="" src="/assets/images/plus.png" />
            Add Video
          </div>
      </div>
    </div>
  );
};

export default ChatBox
