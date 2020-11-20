import React, { useState } from 'react';

const Gallery = ({ galleries, onGalleryChange, activeGallery, color }) => {
  const [focused, setFocused] = useState(true);

  return (
    <div className="wrapper" style={{ overflowX: 'auto' }}>
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
                <img
                  src={gallery?.image?.path ? gallery.image.path : '/assets/images/icons/galleryCover.png'}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      }
    </div >
  );
};

export default Gallery;