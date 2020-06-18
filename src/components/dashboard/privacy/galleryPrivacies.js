import React from 'react';

const GalleryPrivacy = ({
  userGalleries,
  privacyTypes,
  activeGallery,
  onActiveGallery,
  onGalleryPrivacyChange
}) => {
  const handlePrivacy = (privacyType, privacyId, privacyTypeId) => {
    const privacy = {
      privacy_type_id: privacyTypeId,
      privacy_type: privacyType,
      privacy_id: privacyId
    };

    onGalleryPrivacyChange(privacy);
  }

  return (
    <>
      <div className="privacy-header">
        <label>Galleries</label>
      </div>
      <div className="wrapper gallery-section">
        {userGalleries &&
          userGalleries.map((gallery, index) => (
            <div className="toggle-data" key={index}>
              <div className="data-box">
                {gallery.image
                  ? <img src={gallery.image.path} alt="" />
                  : <i className="fa fa-times"></i>
                }
                <label htmlFor=""> {gallery.title} </label>
                <div className="lock-bar" onClick={() => onActiveGallery(gallery.id)}>
                  {(!gallery.privacy || gallery.privacy.privacy_type_id === 1) &&
                    <i className="fas fa-lock-open"></i>
                  }
                  {(gallery.privacy && gallery.privacy.privacy_type_id === 2) &&
                    <i className="fas fa-lock">+</i>
                  }
                  {(gallery.privacy && gallery.privacy.privacy_type_id === 3) &&
                    <i className="fas fa-lock"></i>
                  }
                  {(gallery.privacy && gallery.privacy.privacy_type_id === 4) &&
                    <i className="fas fa-lock">++</i>
                  }
                  {activeGallery === gallery.id
                    ? <i className="fas fa-chevron-down down-tab1"></i>
                    : <i className="fas fa-chevron-up"></i>
                  }
                </div>
              </div>
              {activeGallery === gallery.id &&
                <div className="show-data" id="tab1">
                  <label htmlFor="">  Allowed to view </label>
                  <div className="g-privacy-btn">
                    {privacyTypes &&
                      privacyTypes.map((type, index) => (
                        <div key={index}>
                          {type.id === 1 &&
                            <button
                              onClick={() => handlePrivacy('gallery', gallery.id, type.id)}
                              className={
                                !gallery.privacy ||
                                  gallery.privacy.privacy_type_id === type.id ? 'btn-active' : ''
                              }
                            >
                              {type.name}
                              <i className="fas fa-lock-open"></i>
                            </button>
                          }
                          {type.id === 2 &&
                            <button
                              onClick={() => handlePrivacy('gallery', gallery.id, type.id)}
                              className={
                                gallery.privacy &&
                                  gallery.privacy.privacy_type_id === type.id ? 'btn-active' : ''
                              }
                            >
                              {type.name}
                              <i className="fas fa-lock">+</i>
                            </button>
                          }
                          {type.id === 3 &&
                            <button
                              onClick={() => handlePrivacy('gallery', gallery.id, type.id)}
                              className={
                                gallery.privacy &&
                                  gallery.privacy.privacy_type_id === type.id ? 'btn-active' : ''
                              }
                            >
                              {type.name}
                              <i className="fas fa-lock"></i>
                            </button>
                          }
                          {type.id === 4 &&
                            <button
                              onClick={() => handlePrivacy('gallery', gallery.id, type.id)}
                              className={
                                gallery.privacy &&
                                  gallery.privacy.privacy_type_id === type.id ? 'btn-active' : ''
                              }
                            >
                              {type.name}
                              <i className="fas fa-lock">++</i>
                            </button>
                          }
                        </div>
                      ))}
                  </div>
                </div>
              }
            </div>
          ))
        }
      </div>
    </>
  );
};

export default GalleryPrivacy;
