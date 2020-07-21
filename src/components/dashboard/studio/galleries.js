import React, { useState } from 'react';

const Gallery = ({ galleries, onGalleryChange, activeGallery, color }) => {
  const [focused, setFocused] = useState(true);

  return (
    <div className="wrapper">
      {galleries &&
        <div className="screen">
          <div className="scr-inner">
            {galleries.map((gallery, index) => (
              <div
                ref={ref => {
                  if ((activeGallery.id === gallery.id && focused)) {
                    setFocused(false);
                    return ref?.scrollIntoView({ behavior: 'auto' });
                  } else {
                    return ''
                  }
                }}

                key={index}
                className={`item-box item-box-${index + 1} ${activeGallery === gallery ? "zoom-in" : ""}`}
                onClick={() => onGalleryChange(gallery)}>
                {gallery.image
                  ? <img src={gallery.image.path} alt="" />
                  : <img src={`/assets/images/${color}.png`} alt="" />
                }
              </div>
            ))}
          </div>
        </div>
      }
    </div >
  );
};

export default Gallery;