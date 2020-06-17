import React from 'react';
import Input from '../../common/input';

const GalleryForm = ({ onModelClose, gallery }) => {
  return (
    <div className="gallery-form">
      <div className="update-image">
        <i className="fas fa-window-close" onClick={() => onModelClose(false)}></i>
        <form onSubmit={e => e.preventDefault()}>
          <div className="up-img-box">
            <img className="update-pic" src="/assets/images/gray.png" alt="" />
            <div className="add-nag-icon">
              <div className="nag">
                <div className="nag-icon">
                  <img alt="" src="/assets/images/minus.png" />
                </div>
                <div className="nag-btn">
                  Remove profile picture
              </div>
              </div>

              <div className="nag">
                <div className="nag-icon">
                  <img alt="" src="/assets/images/plus.png" />
                </div>
                <div className="nag-btn">
                  "Add profile picture
              </div>
                <input type="file" size={60} />
              </div>
            </div>
          </div>
          <div className="gallery-title"> {gallery && gallery.title}</div>
          <Input
            name="title"
            placeholder="Enter gallery title"
          />
          <div className="actions">
            <button> Save </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default GalleryForm;
