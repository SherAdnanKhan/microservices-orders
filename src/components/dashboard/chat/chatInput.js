import React from 'react';
import LazyInput from '../../common/lazyInput';
import ToolTip from '../../common/toolTip/toolTip';

const ChatInput = ({
  message, showPostButton, onChange,
  onEnter, onPost, feelColor,
  onOpenUploadModal, onTypingComplete,
  image, video, document
}) => {
  return (
    <div className="message-input">
      {!image && !video && !document && <span
        data-for="uplaodPost"
        data-tip="upload">
        <i
          className="fa fa-plus add-items-btn"
          onClick={onOpenUploadModal}
        />
      </span>}
      <ToolTip id="uploadPost" />
      <LazyInput
        autoFocus
        id="chat-field"
        type="text"
        placeholder="Type a message"
        name="message"
        value={message}
        onChange={onChange}
        onKeyUp={onEnter}
        onSearchComplete={onTypingComplete}
        time={1000}
        autoComplete="off"
      />

      {showPostButton &&
        <button
          onClick={onPost}
          className='clickable btn-send'
          style={{ backgroundColor: feelColor }}
        >
          Post
      </button>
      }
      {!showPostButton &&
        <div className='clickable btn-feel-color feelIcon'
          style={{ backgroundColor: feelColor, textAlign: "center" }}
        >
          <img alt="" src="/assets/images/icons/feelicon.png"
            data-for="feelColor"
            data-tip="feel color" />
          <ToolTip id="feelColor" />
        </div>
      }
    </div >
  );
};

export default React.memo(ChatInput);
