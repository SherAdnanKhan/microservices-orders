import React from 'react';

const WhoIsTyping = ({ typingUsers }) => {
  return (
    <div className='typing-text'>
      {typingUsers.length > 1 &&
        <>
          {typingUsers?.map((typing, index) => (
            <span key={index}>
              {typing.username}
              {index < this.state.typings.length - 1 && 'and'}
            </span>
          ))
          }
         are typing..
        </>
      }
      {typingUsers.length === 1 &&
        <span> {typingUsers[0].username} is typing </span>
      }
    </div>
  );
};

export default WhoIsTyping; 
