import React from 'react';
import { INVITE_ONLY } from '../../../constants/privacyTypes';

const GalleryModel = ({ myGalleries, onModelClose, onChange }) => {
  console.log(myGalleries)
  return (
    <div className="gallery-model">
      <i className="fas fa-window-close" onClick={() => onModelClose(false)}></i>
      <div className="gallery-container">
        {myGalleries &&
          myGalleries.map((gallery, index) => (
            <div>
              {(gallery.privacy && gallery.privacy.privacy_type_id === INVITE_ONLY) &&
                <div className="gallery-row" key={index}>
                  <div className="gallery-item"> Gallery {index + 1} </div>
                  <div className="actions">
                    <input
                      type="checkbox"
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
