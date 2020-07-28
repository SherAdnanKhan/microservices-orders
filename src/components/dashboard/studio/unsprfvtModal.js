import React from 'react';

const UnSuperFvtModal = ({ onModelClose,onUnSprFav,userStudio }) => {
    return (
        <div className="gallery-model">
            <i className="fas fa-window-close" onClick={() => onModelClose(false)}></i>
            <div className="gallery-container">
                <div className="heading"> Are you sure you want to Unsuper favourite?</div>
                <div className="btn-section" >
                    <button className="button success" onClick={()=>onUnSprFav(false)}>Confirm</button>
                    <button className="button danger" onClick={()=>onModelClose(false)}>Cancel</button>
                </div>
            </div>
        </div>
  );
};

export default UnSuperFvtModal;
