import React from 'react';

const MzFlashModal = ({ onConfirm, onModalClose, post }) => {
    return (
        <div className="studio">
            <div className="gallery-model">
                <i className="fas fa-window-close" onClick={() => onModalClose(false)}></i>
                <div className="gallery-container">
                    <div className="heading"> Are you sure you want to share post on Mzflash?</div>
                    <div className="btn-section" >
                        <button className="button success" onClick={() => onConfirm(false, post)}>Yes</button>
                        <button className="button danger" onClick={() => onModalClose(false)}>No</button>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default MzFlashModal;
