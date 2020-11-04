import React from 'react';

const MessageOptions = ({ onDeleteMessage, feelColor }) => {
  return (
    <div className="messageOption">
      <div className="dropdown">
        <div className="dropdown-content" style={{ background: feelColor, color: 'white' }}>
          <p onClick={onDeleteMessage}> Remove </p>
        </div>
      </div>
    </div>
  );
};

export default MessageOptions;
