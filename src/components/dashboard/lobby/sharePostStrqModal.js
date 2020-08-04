import React from 'react';

const sharePostStrqModal = ({ onshare, onModalClose, post }) => {
  return (
    <div className="studio">
      <div className="gallery-model">
        <i className="fas fa-window-close" onClick={() => onModalClose(false)}></i>
        <div className="gallery-container">
          <div className="heading"> Shared Post Model</div>
          <div className="btn-section" >
            <button className="button success" onClick={() => onshare(post)}>Send</button>
            <button className="button danger" onClick={() => onModalClose(false)}>Cancel</button>
          </div>
        </div>
      </div>

    </div>

  );
};

export default sharePostStrqModal;