import React from 'react';

const Gallery = ({ galleries, onGalleryChange, activeGallery, galleryPrivacy, color }) => {
  const isPrivateGallery = gallery => {
    const found = galleryPrivacy.find(g => g.gallery_id === gallery.id);
    return (found && found.is_allowed) ? false : true;
  };

  return (
    <div className="wrapper">
      {galleries &&
        <div className="screen">
          <div className="scr-inner">
            {galleries.map((gallery, index) => (
              !isPrivateGallery(gallery)
                ? (
                  <div
                    key={index}
                    className={`item-box item-box-${index + 1} ${activeGallery === gallery ? "zoom-in" : ""}`}
                    onClick={() => onGalleryChange(gallery)}>
                    <img src={`/assets/images/${color}.png`} alt="" />
                  </div>
                ) : (
                  <div
                    key={index}
                    className={`item-box item-box-${index + 1}`}
                  >
                    <img src={`/assets/images/${color}.png`} alt="" />
                  </div>
                )
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default Gallery;