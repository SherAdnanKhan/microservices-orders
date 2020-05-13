import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyStudio = () => {
  const [edit, setEdit] = useState(true);

  return (
    <div>
      <div className="wrapper">
        {edit &&
          <div className="studioScreen">
            <div className="procu">
              <div className="scene">
                <div className="cube">
                  <div className="cube-face  cube-face-front" style={{ borderColor: 'transparent' }}><img src="/assets/images/logowhite.png" alt="" /></div>
                  <div className="cube-face  cube-face-back" style={{ borderColor: 'transparent' }}><img src="/assets/images/logowhite.png" alt="" /></div>
                  <div className="cube-face  cube-face-left" style={{ borderColor: 'transparent' }}><img src="/assets/images/logowhite.png" alt="" /></div>
                  <div className="cube-face  cube-face-right" style={{ borderColor: 'transparent' }}><img src="/assets/images/logowhite.png" alt="" /></div>
                </div>
              </div>
            </div>
            <div className="profilebioname">
              <span className="nameof" id="nameof">usman Ejaz</span>
              <br />
              <span className="artof" id="artof">Cosplay/1213</span>
            </div>
            <form method="post" action="login.php">
              <label htmlFor="addbio" className="addbio-input">
                <span className="labelText">Click edit Studio to add a bio.</span>
                <input type="text" name="username" id="addbio" />
              </label>
              <div className="faved-btn">
                <Link to="#">
                  <div>
                    <img src="/assets/images/favers.png" alt="" />
                    Faved by
                  </div>
                  <span>1</span>
                </Link>
                <Link to="#">
                  <div>
                    <img src="/assets/images/faving.png" alt="" />
                    Faved
                  </div>
                  <span>3</span>
                </Link>
              </div>
            </form>
          </div>
        }
        {!edit &&
          <div className="edit-studioScreen">
            <div className="procu">
              <div className="editTool Edit">
                <img src="/assets/images/paintbrush.png" alt="" />
              </div>
              <div className="scene">
                <div className="cube">
                  <div className="cube-face  cube-face-front" style={{ borderColor: 'transparent' }}><img src="/assets/images/logowhite.png" alt="" /></div>
                  <div className="cube-face  cube-face-back" style={{ borderColor: 'transparent' }}><img src="/assets/images/logowhite.png" alt="" /></div>
                  <div className="cube-face  cube-face-left" style={{ borderColor: 'transparent' }}><img src="/assets/images/logowhite.png" alt="" /></div>
                  <div className="cube-face  cube-face-right" style={{ borderColor: 'transparent' }}><img src="/assets/images/logowhite.png" alt="" /></div>
                </div>
              </div>
            </div>
            <div className="profilebioname">
              <div className="editTool Edit">
                <img src="/assets/images/paintbrush.png" alt="" />
              </div>
              <span className="nameof" id="nameof">usman Ejaz</span>
              <br />
              <span className="artof" id="artof">Cosplay/1213</span>
            </div>
            <form method="post" action="login.php">
              <label htmlFor="addbio" className="addbio-input">
                <div className="editTool Edit">
                  <img src="/assets/images/paintbrush.png" alt="" />
                </div>
                <span className="labelText">Click edit Studio to add a bio.</span>
                <input type="text" name="username" id="addbio" />
              </label>
              <div className="faved-btn">
                <Link to="#">
                  <div>
                    <img src="/assets/images/favers.png" alt="" />
                    Faved by
                  </div>
                  <span>1</span>
                </Link>
                <Link to="#">
                  <div>
                    <img src="/assets/images/faving.png" alt="" />
                    Faved
                  </div>
                  <span>3</span>
                </Link>
              </div>
            </form>
          </div>
        }
      </div>
      <div className="editstudio-btn">
        <button onClick={() => setEdit(!edit)}>
          <img src="/assets/images/paintbrush.png" alt="" />
          {edit ? "Edit Studio" : "View Studio"}
        </button>
      </div>
      <div className="wrapper">
        {edit &&
          <div className="screen">
            <div className="scr-inner">
              <div className="item-box">
                <img src="/assets/images/galleryicon.png" alt="" />
              </div>
              <div className="item-box">
                <img src="/assets/images/galleryicon.png" alt="" />
              </div>
              <div className="item-box">
                <img src="/assets/images/galleryicon.png" alt="" />
              </div>
              <div className="item-box">
                <img src="/assets/images/galleryicon.png" alt="" />
              </div>
            </div>
          </div>
        }
        {!edit &&
          <div className="edit-screen">
            <div className="scr-inner">
              <div className="item-box">
                <div className="editTool Edit">
                  <img src="/assets/images/paintbrush.png" alt="" />
                </div>
                <img src="/assets/images/galleryicon.png" alt="" />
              </div>
              <div className="item-box">
                <div className="editTool Edit">
                  <img src="/assets/images/paintbrush.png" alt="" />
                </div>
                <img src="/assets/images/galleryicon.png" alt="" />
              </div>
              <div className="item-box">
                <div className="editTool Edit">
                  <img src="/assets/images/paintbrush.png" alt="" />
                </div>
                <img src="/assets/images/galleryicon.png" alt="" />
              </div>
              <div className="item-box">
                <div className="editTool Edit">
                  <img src="/assets/images/paintbrush.png" alt="" />
                </div>
                <img src="/assets/images/galleryicon.png" alt="" />
              </div>
            </div>
          </div>
        }
      </div>
      <div className="total-post">
        <div className="icon-side">
          <i className="fas fa-square" />
        </div>
        <div className="gallery">
          <p>Select a Gallery</p>
          <p>Total posts: 2</p>
        </div>
      </div>
      <div className="wrapper">
        <p className="footer-text">production of: QuetzalArtz x R&amp;R </p>
      </div>
    </div>
  );
};

export default MyStudio;
