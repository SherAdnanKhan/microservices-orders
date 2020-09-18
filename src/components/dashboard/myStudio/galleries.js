import React from 'react';
import ToolTip from '../../common/toolTip/toolTip';

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
                  src={gallery?.image ? gallery?.image?.path : '/assets/images/icons/galleryCover.png'}
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
                    data-for="editGallery"
                    data-tip="edit gallery"
                  />
                  <ToolTip id="editGallery" />
                </div>
                <img
                  src={gallery?.image ? gallery?.image?.path : '/assets/images/icons/galleryCover.png'}
                  alt=""
                />
              </div>
            ))}
            <h1 onClick={() => onModelOpen('')} className="clickable">
              <img
                src='/assets/images/add.png'
                alt=""
                data-for="uploadGallery"
                data-tip="upload gallery"
              />
              <ToolTip id="uploadGallery" />
            </h1>
          </div>
        </div>
      }
    </div>
  );
};

export default Gallery;
