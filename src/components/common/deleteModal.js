import React from 'react';


const DeleteModal = ({ onDelete, onModalClose, activePost }) => {
    // const handleDelete = (status, post) => {
    //     setShowDeleteModel(status);
    //     dispatch(deletePost(post));
    // }
    return (
        <div className="studio">
            <div className="gallery-model">
                <i className="fas fa-window-close" onClick={() => onModalClose(false)}></i>
                <div className="gallery-container">
                    <div className="heading"> Are you sure you want to Delete Post?</div>
                    <div className="btn-section" >
                        <button className="button success" onClick={() => onDelete(false, activePost)}>Confirm</button>
                        <button className="button danger" onClick={() => onModalClose(false)}>Cancel</button>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default DeleteModal;