import React from 'react';

const OtherPrivacy = ({ userOtherPages, activeOtherPage, onActiveOtherPage, privacyTypes }) => {
  return (
    <>
      <div className="privacy-header">
        <label>Others</label>
      </div>
      <div className="wrapper gallery-section">
        {userOtherPages &&
          userOtherPages.map((other, index) => (
            <div className="toggle-data" key={index}>
              <div className="data-box">
                {other.id === 1 && <img src="/assets/images/strqicon.png" alt="" />}
                {other.id === 2 && <img src="/assets/images/mzflash.png" alt="" />}
                {other.id === 3 && <img src="/assets/images/crit1.png" alt="" />}
                {other.id === 4 && <img src="/assets/images/faving.png" alt="" />}
                {other.id === 5 && <img src="/assets/images/favers.png" alt="" />}
                {other.id === 6 && <img src="/assets/images/favers.png" alt="" />}
                {other.id === 7 && <img src="/assets/images/favers.png" alt="" />}
                <label htmlFor="">{other.name}</label>
                <div className="lock-bar" onClick={() => onActiveOtherPage(other.id)}>
                  <i className="fas fa-lock-open"></i>
                  {other.id === activeOtherPage
                    ? <i className="fas fa-chevron-down down-tab3"></i>
                    : <i className="fas fa-chevron-up up-tab3" ></i>
                  }
                </div>
              </div>
              {other.id === activeOtherPage &&
                <div className="show-data" id="tab3">
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
          ))}
      </div>
    </>
  );
};

export default OtherPrivacy;
