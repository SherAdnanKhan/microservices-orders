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
        {messages.map((msg, index) => (
          <div key={index} className="message-row group">
            <div className="outgoing">
              {msg}
            </div>
          </div>
        ))}
        <div className="message-row">
          <div className="incoming">
            hellolasjdlsadjlkasjdkljkladsjlkajsdskdjaskld
          </div>
        </div>

        <div className="message-row">
          <div className="outgoing">
            hi
          </div>
        </div>
      </div>
      <input
        autoFocus
        placeholder="Type a message"
        type="text"
        name="message"
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyUp={handleEnter}
      />
    </div>
  );
};

export default ChatBox
