import React from 'react';

const Gallery = ({ galleries, edit, onGalleryChange, activeGallery }) => {
  return (
    <div className="wrapper">
      {edit && galleries &&

        
        <div className="screen">
          <div className="scr-inner">
            {galleries.map((gallery, index) => (
              <div
                key={index}
                className={`item-box item-box-${index + 1} ${activeGallery === gallery ? "zoom-in" : ""}`}
                onClick={() => onGalleryChange(gallery)}>
                <img src="/assets/images/galleryicon.png" alt="" />
              </div>
            ))}
          </div>

          
        </div>
        
      }
      {!edit && galleries &&
        <div className="edit-screen">
          <div className="scr-inner">
            {galleries.map((gallery, index) => (
              <div key={index} className={`item-box item-box-${index + 1}`}>
                <div className="editTool Edit">
                  <img src="/assets/images/paintbrush.png" alt="" />
                </div>
                <img src="/assets/images/galleryicon.png" alt="" />
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default Gallery;
