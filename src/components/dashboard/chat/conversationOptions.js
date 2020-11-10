import React from 'react';

const ConversationOptions = ({ onDeleteConversation, feelColor, toggleDeleteModal }) => {
  return (
    <div className="messageOption">
      <div className="dropdown">
        <div className="dropdown-content" style={{ background: feelColor, color: 'white' }}>
          <p
            onClick={toggleDeleteModal ?
              toggleDeleteModal
              : onDeleteConversation}> Remove </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationOptions;
