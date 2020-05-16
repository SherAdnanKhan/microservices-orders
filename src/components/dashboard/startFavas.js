import React from 'react';
import { Link } from 'react-router-dom';

const StartFaves = () => {
  return (
    <div className="wrapper fav-page">
      <div className="f-text-box">
        <h3 className="f-title">GETTING STARTED</h3>
        <p className="f-paragrah">Welcome usman there are many other exibitions for you to see and enjoy and many other artist for you to meet</p>
        <h1>>></h1>
      </div>
      <div className="f-image-box">
        <div className="f-header">
          <h4>Aries</h4>
          <p>hfjksdf</p>
          <h4>Web Designer/Programmer</h4>
        </div>
        <div className="f-gallery-box">
          <div className="f-img-box">
            <div className="main-img">
              <img src="/assets/images/pic1 (1).png" alt="avatar" />
            </div>
            <div className="other-img">
              <img src="/assets/images/pic1 (1).png" alt="avatar" />
              <img src="/assets/images/pic1 (1).png" alt="avatar" />
              <img src="/assets/images/pic1 (1).png" alt="avatar" />
              <img src="/assets/images/pic1 (1).png" alt="avatar" />
            </div>
          </div>
          <h2>Gallery</h2>
        </div>
        <div className="f-footer">
          <Link to="/tutorial">
            <img style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}
              src="/assets/images/catfave.png"
              alt="avatar"
            />
          </Link>
          <h3 className="f-footer-text">ADD TO FAV'S</h3>
        </div>
      </div>
    </div>
  );
};
export default StartFaves;