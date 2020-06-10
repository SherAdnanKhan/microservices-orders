import React from 'react';

const GalleryPrivacy = ({ userGalleries, privacyTypes, activeGallery, onActiveGallery }) => {
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
                <i className="fa fa-times"></i>
                <label htmlFor="">Gallery {index + 1}</label>
                <div className="lock-bar" onClick={() => onActiveGallery(gallery.id)}>
                  <i className="fas fa-lock-open"></i>
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
                            <button>
                              {type.name}
                              <i className="fas fa-lock-open"></i>
                            </button>
                          }
                          {type.id === 2 &&
                            <button>
                              {type.name}
                              <i className="fas fa-lock">+</i>
                            </button>
                          }
                          {type.id === 3 &&
                            <button>
                              {type.name}
                              <i className="fas fa-lock"></i>
                            </button>
                          }
                          {type.id === 4 &&
                            <button>
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
