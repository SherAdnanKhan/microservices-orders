import React from 'react';

const ConversationOptions = ({ onDeleteConversation, feelColor }) => {
  return (
    <div className="messageOption">
      <div className="dropdown">
        <div className="dropdown-content" style={{ background: feelColor, color: 'white' }}>
          <p onClick={onDeleteConversation}> Remove </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationOptions;
