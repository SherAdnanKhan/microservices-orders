import React from 'react';

const Comment = () => {
  return (
    <>
      <div className="user-list-view">
        <div className="user-list-top">
          <div className="user-name">
            <p>Akif</p>
          </div>
          <div className="user-cude">
            <div className="artcubecase">
              <div className="procusmallmove">
                <div className="scenesmall">
                  <a href="studio.php?idstudio=4&gal=1">
                    <div className="cubesmallmove">
                      <div className="cube-facesmall  cube-face-frontsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}><img src="/assets/images/logowhite.png" height="100%" alt="" /></div>
                      <div className="cube-facesmall  cube-face-backsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}><img src="/assets/images/logowhite.png" height="100%" alt="" /></div>
                      <div className="cube-facesmall  cube-face-leftsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}><img src="/assets/images/logowhite.png" height="100%" alt="" /></div>
                      <div className="cube-facesmall  cube-face-rightsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}><img src="/assets/images/logowhite.png" height="100%" alt="" /></div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

          </div>
          <div className="user-link">
            <p>WebDesign/ <br /> Programmer </p>
          </div>

        </div>
        <div className="big-image">
          <img src="/assets/images/gray.png" alt="" />
          <div className="right-box">
          </div>
        </div>
        <div>
          <p>Second</p>
        </div>
        <div className="user-btns">
          <div>
            <img src="/assets/images/strokeiconem.png" alt="" />
            <p>1 stroke</p>
          </div>
          <div>
            <img className="open-commet" src="/assets/images/crit1.png" alt="" />
          </div>
          <div>
            <img src="/assets/images/ncommnicon.png" alt="" />
          </div>
        </div>
      </div>

      <div className="comments-box">
        <div className="comment-bar">
          <div className="commnent-img">
            <img src="/assets/images/gray.png" alt="" />
            <i className="fa fa-times close-comment"></i>
          </div>
          <div className="comment-sec">
            <div className="user-commet">
              <div className="user-cude">
                <div className="artcubecase">
                  <div className="procusmallmove">
                    <div className="scenesmall">
                      <a href="studio.php?idstudio=4&gal=1">
                        <div className="cubesmallmove">
                          <div className="cube-facesmall  cube-face-frontsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}><img src="/assets/images/logowhite.png" height="100%" alt="" /></div>
                          <div className="cube-facesmall  cube-face-backsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}><img src="/assets/images/logowhite.png" height="100%" alt="" /></div>
                          <div className="cube-facesmall  cube-face-leftsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}><img src="/assets/images/logowhite.png" height="100%" alt="" /></div>
                          <div className="cube-facesmall  cube-face-rightsmall" style={{ borderColor: 'orange', boxShadow: '1px 1px 10px orange, -1px -1px 10px orange' }}><img src="/assets/images/logowhite.png" height="100%" alt="" /></div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="comment-info">
                <p>Usman : <span>Message Here</span> </p>
                <p> 20 h </p>
              </div>
            </div>
          </div>
          <div className="text-area">
            <div className="msg-input">
              <textarea placeholder=" Add a critique..." />
            </div>
            <button>
              <img src="/assets/images/crit1.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
