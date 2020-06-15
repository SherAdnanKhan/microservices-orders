import React from 'react';

const Gallery = ({ galleries, onGalleryChange, activeGallery, color }) => {
  return (
    <div className="wrapper">
      {galleries &&
        <div className="screen">
          <div className="scr-inner">
            {galleries.map((gallery, index) => (
              <div
                key={index}
                className={`item-box item-box-${index + 1} ${activeGallery === gallery ? "zoom-in" : ""}`}
                onClick={() => onGalleryChange(gallery)}>
                <img src={`/assets/images/${color}.png`} alt="" />
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default Gallery;