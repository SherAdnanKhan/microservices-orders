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
                  <div className="gallery-item"> Gallery {index + 1} </div>
                  <div className="actions">
                    <input
                      type="checkbox"
                      disabled={hasInvited(gallery)}
                      checked={hasInvited(gallery)}
                      onChange={e => onChange(e, gallery.id)}
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
