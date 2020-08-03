import React from 'react';

const UnSuperFvtModal = ({ onModelClose,onUnSprFav,userStudio }) => {
    return (
        <div className="lobby-modal">
            <i className="fas fa-window-close" onClick={() => onModelClose(false)}></i>
            <div className="lobby-container">
                <div className="lobby-heading"> Are you sure you want to Unsuper favourite?</div>
                <div className="lobby-btn-section" >
                    <button className="button success" onClick={()=>onUnSprFav(false)}>Confirm</button>
                    <button className="button danger" onClick={()=>onModelClose(false)}>Cancel</button>
                </div>
            </div>
        </div>
  );
};

export default UnSuperFvtModal;
