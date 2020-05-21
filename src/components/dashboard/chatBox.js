import React, { useState, useEffect } from 'react';
import $ from 'jquery';
// import io from 'socket.io-client';

const ChatBox = () => {
  // const url = process.env.REACT_APP_API_URL;
  // const [socket] = useState(io.connect(url));

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');


  useEffect(() => {
    // socket.on('join', () => {

    // });

    // return () => {
    //   socket.emit('disconnect');
    // }
  });

  const handleEnter = e => {
    if (e.keyCode === 13) {
      const newMessages = [...messages, message];
      setMessages(newMessages);
      setMessage('');

      $('.chat-container').stop().animate({
        scrollTop: $('.chat-container')[0].scrollHeight
      }, 'slow');
    }
  }

  return (
    <div className="chat-box">
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

        {messages.map((msg, index) => (
          <div key={index} className="message-row group">
            <div className="outgoing">
              {msg}
            </div>
          </div>
        ))}
        <div className="message-row group">
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
        </div>
      </div>
      <div className="message-input">
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
    </div>
  );
};

export default ChatBox
