import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyGalleries } from "../../actions/galleryActions";


const RepostModal = ({ onModalClose, post, onRepost, onGalleryId, selectedGalleryId }) => {
    const dispatch = useDispatch();
    const { myGalleries } = useSelector(state => state.gallery);

    useEffect(() => {
        dispatch(getMyGalleries())
    }, [dispatch]);

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