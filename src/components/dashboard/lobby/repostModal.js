import React from 'react';

const RepostModal = ({ onModalClose, post, myGalleries, feelColor, onRepost, onGalleryId, selectedGalleryId }) => {
    return (
        <div className="studio">
            <div className="gallery-model">
                <i className="fas fa-window-close" onClick={() => onModalClose(false)}></i>
                <div className="gallery-container">
                    <div className="heading">Select gallery in which you want to save post</div>
                    <div className="exibition-gallery-header">
                        <p> Choose Gallery</p>
                    </div>
                    <div className="galleries">
                        {myGalleries &&
                            myGalleries.map((gallery, index) => (
                                <>
                                    <div className="flex" key={index}>
                                        <div className="padd">
                                            <p>{gallery.id}</p>
                                            <input
                                                type="radio"
                                                name="gallery_id"
                                                id={gallery.id}
                                                value={gallery.id}
                                                onClick={() => onGalleryId(gallery)}
                                            />
                                        </div>
                                        <div className="padd">
                                            <span> {gallery.title} </span>
                                        </div>

                                    </div>
                                </>
                            ))
                        }
                    </div>
                    <div className="btn-section">
                        <button className="button success" onClick={() => onRepost(false, post, selectedGalleryId)} >Repost</button>
                    </div>
                </div>
            </div>

        </div >

    );
};

export default RepostModal;