import React from 'react';
import ToolTip from '../../common/toolTip/toolTip';

const ChatInput = ({ message, onChange, onEnter, onPost, feelColor, onOpenUploadModal }) => {
  return (
    <div className="message-input">
      <span
        data-for="uplaodPost"
        data-tip="upload">
        <i
          className="fa fa-plus add-items-btn"
          onClick={onOpenUploadModal}
        />
      </span>
      <ToolTip id="uploadPost" />
      <input
        autoFocus
        placeholder="Type a message"
        type="text"
        name="message"
        value={message}
        onChange={onChange}
        onKeyUp={onEnter}
      />
      <button
        onClick={onPost}
        className='clickable btn-send'
        style={{ backgroundColor: feelColor }}
      >
        Post
    </button>
    </div>
  );
};

export default ChatInput;
