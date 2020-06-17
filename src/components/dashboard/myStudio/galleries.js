import React from 'react';

const Gallery = ({ galleries, edit, onGalleryChange, activeGallery, onModelOpen }) => {
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
                <img
                  src={gallery.image ? gallery.image.path : '/assets/images/galleryicon.png'}
                  alt=""
                />
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
                  <img
                    src="/assets/images/paintbrush.png"
                    alt=""
                    onClick={() => onModelOpen(gallery)}
                  />
                </div>
                <img
                  src={gallery.image ? gallery.image.path : '/assets/images/galleryicon.png'}
                  alt=""
                />
              </div>
            ))}
            <h1 onClick={() => onModelOpen('')} className="clickable"> + </h1>
          </div>
        </div>
      }
    </div>
  );
};

export default Gallery;
