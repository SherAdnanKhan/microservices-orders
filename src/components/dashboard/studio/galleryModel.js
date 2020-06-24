import React from 'react';
import { INVITE_ONLY } from '../../../constants/privacyTypes';

const GalleryModel = ({ myGalleries, onModelClose, onChange, galleryInvitedList, user }) => {
  const hasInvited = (gallery) => {
    return galleryInvitedList.some(id => id === gallery.id)
  }

  return (
    <div className="gallery-model">
      <i className="fas fa-window-close" onClick={() => onModelClose(false)}></i>
      <div className="gallery-container">
        <div className="heading"> Send Invitation to {user && user.username}</div>
        {myGalleries &&
          myGalleries.map((gallery, index) => (
            <div key={index}>
              {(gallery.privacy && gallery.privacy.privacy_type_id === INVITE_ONLY) &&
                <div className="gallery-row">
                  <div className="gallery-item"> {gallery.title} </div>
                  <div className="actions">
                    <input
                      type="checkbox"
                      onChange={e => onChange(e, gallery.id)}
                      checked={hasInvited(gallery)}
                    />
                    <label>invite</label>
                  </div>
                </div>
              }
            </div>
          ))}
      </div>
    </div>
  );
};

export default GalleryModel;
