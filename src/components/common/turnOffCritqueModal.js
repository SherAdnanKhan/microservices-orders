import React from 'react';

const TurnOffCrtiqueModal = ({ onModalClose, post, onHandleCrtique }) => {
    return (
        <div className="studio">
            <div className="gallery-model">
                <i className="fas fa-window-close" onClick={() => onModalClose(false)}></i>
                <div className="gallery-container">
                    {post.critiques_status === 1 &&  //if crtiques are on
                        <div className="heading">  Are you sure you want to Turn Off critiques?
                    </div>
                    }
                    {post.critiques_status === 0 &&   //if crtiques are off
                        <div className="heading">  Are you sure you want to Turn On critiques?
                            </div>
                    }
                    <div className="btn-section" >
                        {post.critiques_status === 1 &&
                            <button className="button success" onClick={() => onHandleCrtique(false, post, 0)}>
                                Confirm</button>
                        }
                        {post.critiques_status === 0 &&
                            <button className="button success" onClick={() => onHandleCrtique(false, post, 1)}>
                                Confirm</button>
                        }
                        <button className="button danger" onClick={() => onModalClose(false)}>Cancel</button>
                    </div>
                </div>
            </div>

        </div >

    );
};

export default TurnOffCrtiqueModal;