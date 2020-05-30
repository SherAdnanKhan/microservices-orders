import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getConversation, updateConversation } from '../../actions/conversationActions';
import io from 'socket.io-client';
// import { UPDATE_CONVERSATION } from '../../constants/actionTypes';
//import { useWindowUnloadEffect } from '../common/useWindowUnloadEffect';

const ChatBox = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { conversation, messages } = useSelector(state => state.conversation);

  const url = process.env.REACT_APP_SOCKET_URL;
  const [socket, setSocket] = useState('');

  // const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
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
      if (conversation && conversation.id) {
        console.log("GY")
        socket.emit('join', { room: conversation && conversation.id }, () => {
          console.log(`Group with id ${conversation.id}  joined `);
        });

        socket.on('recieveMessage', (data) => {
          // console.log("recieve: ", data);
          dispatch(updateConversation(data));
        })
      }
    }

    return () => {
      if (socket) {
        socket.emit('disconnect');
        // dispatch(clearConversation());
      }
    }
  }, [socket, url, conversation, dispatch]);


  const handleEnter = e => {
    if (e.keyCode === 13) {
      // const newMessages = [...messages, message];
      // setMessages(newMessages);
      // setMessage('');

      socket.emit('sendMessage', ({ message: e.target.value, room: conversation.id }), () => {
        setMessage('');
      });

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

        <div className="artcubecase">
          <div className="procusmallmove">
            <div className="scenesmall">
              <a href="studio.php?idstudio=4&gal=1">
                <div className="cubesmallmove">
                  <div className="cube-facesmall  cube-face-frontsmall" ><img alt="" src="/assets/images/logowhite.png" height="100%" /></div>
                  <div className="cube-facesmall  cube-face-backsmall" ><img alt="" src="/assets/images/logowhite.png" height="100%" /></div>
                  <div className="cube-facesmall  cube-face-leftsmall" ><img alt="" src="/assets/images/logowhite.png" height="100%" /></div>
                  <div className="cube-facesmall  cube-face-rightsmall" ><img alt="" src="/assets/images/logowhite.png" height="100%" /></div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="user-Status">
          <p>User Name</p>
          <span>Time Ago Active</span>
        </div>
        <div className="call-btn">
          <button>video Call</button>
          <button>Draw</button>
        </div>
      </div>
      <div className="chat-container">
        <div className="chat-uesr">
          <div className="artcubecase">
            <div className="procusmallmove">
              <div className="scenesmall">
                <a href="studio.php?idstudio=4&gal=1">
                  <div className="cubesmallmove">
                    <div className="cube-facesmall  cube-face-frontsmall" ><img alt="" src="/assets/images/logowhite.png" height="100%" /></div>
                    <div className="cube-facesmall  cube-face-backsmall" ><img alt="" src="/assets/images/logowhite.png" height="100%" /></div>
                    <div className="cube-facesmall  cube-face-leftsmall" ><img alt="" src="/assets/images/logowhite.png" height="100%" /></div>
                    <div className="cube-facesmall  cube-face-rightsmall" ><img alt="" src="/assets/images/logowhite.png" height="100%" /></div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="chat-uesr-name">
            <p>	You are now Strqing with </p>
            <span>AriesQuetz</span>
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
          messages.map((message, index) => (
            <div
              className="message-row group"
              key={index}
            >
              <div className="outgoing">
                <div className="send-icon">
                  <img alt="" src="/assets/images/limegreen.png" />
                </div>
                <p>{message.message}</p>
              </div>
            </div>
          ))
        }
        {/* <div className="message-row group">
          <div className="incoming">
            <div className="artcubecase">
              <div className="procusmallmove">
                <div className="scenesmall">
                  <a href="studio.php?idstudio=4&gal=1">
                    <div className="cubesmallmove">
                      <div className="cube-facesmall  cube-face-frontsmall" ><img alt="" src="/assets/images/logowhite.png" height="100%" /></div>
                      <div className="cube-facesmall  cube-face-backsmall" ><img alt="" src="/assets/images/logowhite.png" height="100%" /></div>
                      <div className="cube-facesmall  cube-face-leftsmall" ><img alt="" src="/assets/images/logowhite.png" height="100%" /></div>
                      <div className="cube-facesmall  cube-face-rightsmall" ><img alt="" src="/assets/images/logowhite.png" height="100%" /></div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <p>hellolasjdlsadjlkasjdkljkladsjlkajsdskdjaskld</p>
          </div>
        </div>

        <div className="message-row group">
          <div className="outgoing">
            <div className="send-icon">
              <img alt="" src="/assets/images/limegreen.png" />
            </div>
            <p>hi</p>
          </div>
        </div> */}
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
