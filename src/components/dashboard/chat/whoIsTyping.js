import React from 'react';

const WhoIsTyping = ({ typingUsers }) => {
  return (
    <div className='typing-text'>
      {typingUsers.length > 1 &&
        <>
          <div className="bubbleText">
            {typingUsers?.map((typing, index) => (
              <span className="bubbleTextSpan" key={index}>
                {typing.username}
                {index < this.state.typings.length - 1 && 'and'}
              </span>
            ))
            }
            are typing
          </div>
          <div class="bubbleDots">
            <div class="loadingDot loadingDot--1">
            </div>

            <div class="loadingDot loadingDot--2">
            </div>

            <div class="loadingDot loadingDot--3">
            </div>
          </div>
        </>
      }
      {typingUsers.length === 1 &&
        <>
        <div className="bubbleText">
          <span className="bubbleTextSpan"> {typingUsers[0].username} is typing </span>
        </div>

        <div class="bubbleDots">
          <div class="loadingDot loadingDot--1">
          </div>

          <div class="loadingDot loadingDot--2">
          </div>

          <div class="loadingDot loadingDot--3">
          </div>
        </div>
        </>
      }
    </div>
  );
};

export default WhoIsTyping; 
